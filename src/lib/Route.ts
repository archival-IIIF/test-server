import * as Router from "koa-router";
import Collection from "../presentation-builder/v3/Collection";
import {transformCollectionToV2} from "./Transform";
import Base from "../presentation-builder/v3/Base";
import {hasAccess} from "./Security";
import {cloneDeep} from 'lodash';
import {ParameterizedContext} from "koa";

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
    body: (ctx: ParameterizedContext, prefix: string) => Collection;
    children?: iRoute[];
}

export function getIIIFRouteTree(routes: iRoute[]) {
    const router: Router = new Router();

    addIIIFRoutes(routes, router);

    return router.routes();
}

export function addIIIFRoutes(routes: iRoute[], router: Router, parentPath?: string) {

    for (const route of routes) {

        router.get('/iiif/v2' + route.path, ctx => {
            ctx.body = transformCollectionToV2(route.body(ctx, '/iiif/v2'));
        });
        router.get('/iiif/v3' + route.path, ctx => {
            const prefix = '/iiif/v3';
            const body = route.body(ctx, prefix);
            if (parentPath) {
                body.setParent(ctx.request.origin + prefix + parentPath, 'Collection')
            }
            if (route.children) {
                for (const child of route.children) {
                    body.setItems(child.body(ctx, prefix));
                }
            }
            ctx.body = body;
        });

        if (route.children) {
            addIIIFRoutes(route.children, router, route.path);
        }
    }
}
