import * as Router from "koa-router";
import Collection from "../presentation-builder/v3/Collection";
import {transformCollectionToV2} from "./Transform";
import Base from "../presentation-builder/v3/Base";
import {hasAccess} from "./Security";
import {cloneDeep} from 'lodash';
import {ParameterizedContext} from "koa";
import RootCollection from "./RootCollection";
import Manifest from "../presentation-builder/v3/Manifest";
import imageSize from "image-size";
import {infoV2, infoV3} from "../imageService/imageBase";
import {basename} from "../../../viewer/src/lib/ManifestHelpers";
import {responseFile} from "../imageService/imageService";
import ImageManifest2 from "./ImageManifest2";
import AuthService from "../presentation-builder/v3/AuthService";

export function addCollectionRoute(
    router: Router,
    collection: Collection,
    cookieName?: string,
    cookieToken?: string,
    viewerToken?: string,
    changeFunc?: (ctx: ParameterizedContext, collection: Collection, hasAccess0: boolean) => void
) {
    const versions = ['v2', 'v3'];
    for (const version of versions) {
        const prefix = '/iiif/' + version;

        router.get( prefix + collection.id, ctx => {

            let hasAccess0 = true;
            if (cookieName || cookieToken || viewerToken) {
                if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
                    ctx.status = 401;
                    hasAccess0 = false;
                }
            }

            const collectionWithOrigin = cloneDeep(collection)

            if (changeFunc) {
                changeFunc(ctx, collectionWithOrigin, hasAccess0);
            }

            addOriginToManifest(collectionWithOrigin, ctx.request.origin, prefix);


            if (version === 'v2') {
                ctx.body = transformCollectionToV2(collectionWithOrigin);
            } else {
                ctx.body = collectionWithOrigin;
            }
        });
    }
}

function addOriginToManifest(manifest: Base, origin: string, prefix: string): Base {

    if (!manifest.id.startsWith('http')) {
        if (manifest.id.startsWith('/manifest/') || manifest.id.startsWith('/collection/')) {
            manifest.id = origin + prefix + manifest.id;
        } else {
            manifest.id = origin + manifest.id;
        }
    }

    for (const value of Object.values(manifest)) {
        if (Array.isArray(value)) {
            for (const subManifest of value) {
                addOriginToManifest(subManifest, origin, prefix);
            }
        }
    }

    return manifest;
}

interface iRoute {
    path: string;
    body: (ctx: ParameterizedContext, prefix: string, path: string, label: string | undefined, route: iRoute, auth?: boolean)
        => Collection | Manifest;
    label?: string;
    children?: iRoute[];
    images?: string[];
    cookieName?: string;
    cookieToken?: string;
    viewerToken?: string;
    authService?: (ctx: ParameterizedContext) => AuthService;
}

export function getIIIFRouteTree(routes: iRoute[]) {
    const router: Router = new Router();

    addIIIFRoutes(routes, router);

    return router.routes();
}

export function addIIIFRoutes(routes: iRoute[], router: Router, parentPath?: string) {

    for (const route of routes) {
        for (const version of ['v2', 'v3']) {
            const prefix = '/iiif/' + version;
            router.get(prefix + route.path, ctx => {
                const body = route.body(ctx, prefix, route.path, route.label, route);
                if (parentPath) {
                    body.setParent(ctx.request.origin + prefix + parentPath, 'Collection')
                }
                if (route.children) {
                    for (const child of route.children) {
                        const miniRoute: iRoute = {path: child.path, body: child.body};
                        body.setItems(child.body(ctx, prefix, child.path, child.label, miniRoute));
                    }
                }
                if (version === 'v2') {
                    ctx.body = transformCollectionToV2(body);
                } else {
                    ctx.body = body;
                }
            });

            if (route.images) {
                let i = 0;
                for (const imagePath of route.images) {
                    const imageId = basename(route.path) + '_' + i.toString();
                    const size = imageSize(imagePath);
                    router.get('/iiif/'  +version + '/image/' + imageId + '/info.json', ctx => {

                        const id =  ctx.request.origin + ctx.request.url.replace('/info.json', '');
                        if (version === 'v2') {
                            ctx.body = infoV2(id, size.width, size.height);
                        } else {
                            ctx.body = infoV3(id, size.width, size.height);
                        }
                    });
                    router.get('/iiif/'  +version + '/image/' + imageId + '/:region/:size/:rotation/:quality.:format', async ctx => {
                        if (route.cookieName && route.cookieToken && route.viewerToken && !hasAccess(ctx, route.cookieName, route.cookieToken, route.viewerToken)) {
                            ctx.status = 401;
                            return;
                        }

                        await responseFile(ctx, imagePath, size.width, size.height);
                    });

                    i++;
                }
            }

        }

        if (route.children) {
            addIIIFRoutes(route.children, router, route.path);
        }
    }
}

export function getImageBody(ctx: ParameterizedContext, prefix: string, path: string, label: string | undefined, route: iRoute): Manifest
{
    const i = new ImageManifest2(
        ctx.request.origin + prefix + path,
        route.images ?? [],
        label ?? '-'
    );
    if (route.authService) {
        i.setService(route.authService(ctx));
        if (route.cookieName && route.cookieToken && route.viewerToken && !hasAccess(ctx, route.cookieName, route.cookieToken, route.viewerToken)) {
            ctx.status = 401;
        }
    }

    return i;
}

export function getCollectionBody(ctx: ParameterizedContext, prefix: string, path: string, label: string | undefined): RootCollection
{
    return new RootCollection(
        ctx.request.origin + prefix + path,
        label ?? '-'
    );
}
