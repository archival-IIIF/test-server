import * as Router from "koa-router";
import {Collection, Manifest, AuthService} from "@archival-iiif/presentation-builder";
import {transformCollectionToV2, transformManifestToV2} from "./Transform";
import {hasAccess} from "./Security";
import {ParameterizedContext} from "koa";
import RootCollection from "./RootCollection";
import imageSize from "image-size";
import {infoV2, infoV3} from "../imageService/imageBase";
import {basename} from "../../../viewer/src/lib/ManifestHelpers";
import {responseFile} from "../imageService/imageService";
import ImageManifest2 from "./ImageManifest2";

export interface iRoute {
    path: string;
    body: (ctx: ParameterizedContext, prefix: string, path: string, label: string | undefined, route: iRoute, auth?: boolean)
        => Collection | Manifest;
    label?: string;
    children?: iRoute[];
    images?: string[];
    noImageAuth?: boolean;
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
                        body.setItems([child.body(ctx, prefix, child.path, child.label, miniRoute) as any]);
                    }
                }

                if (
                    (route.cookieName || route.cookieToken || route.viewerToken) &&
                    !hasAccess(ctx, route.cookieName, route.cookieToken, route.viewerToken)
                ) {
                    ctx.status = 401;
                }

                if (version === 'v2') {
                    if (body.type === 'Collection') {
                        ctx.body = transformCollectionToV2(body);
                    } else {
                        ctx.body = transformManifestToV2(body);
                    }
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
                        if (
                            route.noImageAuth !== true &&
                            (route.cookieName || route.cookieToken || route.viewerToken) &&
                            !hasAccess(ctx, route.cookieName, route.cookieToken, route.viewerToken)
                        ) {
                            ctx.status = 401;
                            return;
                        }

                        await responseFile(ctx, imagePath);
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

export function getCollectionBody(ctx: ParameterizedContext, prefix: string, path: string, label: string | undefined,
                                  route: iRoute): RootCollection
{
    const c = new RootCollection(
        ctx.request.origin + prefix + path,
        label ?? '-'
    );
    if (route.authService) {
        c.setService(route.authService(ctx));
        if (route.cookieName && route.cookieToken && route.viewerToken &&
            !hasAccess(ctx, route.cookieName, route.cookieToken, route.viewerToken)) {
            ctx.status = 401;
        }
    }

    return c;
}
