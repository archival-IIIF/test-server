import * as Router from "koa-router";
import Collection from "../presentation-builder/v3/Collection";
import {transformCollectionToV2} from "./Transform";
import Base from "../presentation-builder/v3/Base";
import {hasAccess} from "./Security";
import {ParameterizedContext} from "koa";

export function addCollectionRoute(
    router: Router,
    collection: Collection,
    cookieName?: string,
    cookieToken?: string,
    viewerToken?: string
) {
    const versions = ['v2', 'v3'];
    for (const version of versions) {
        const prefix = '/iiif/' + version;

        router.get( prefix + collection.id, ctx => {

            if (cookieName || cookieToken || viewerToken) {
                if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
                    ctx.status = 401;
                }
            }

            collection = addOriginToManifest(collection, ctx.request.origin, prefix);

            if (version === 'v2') {
                ctx.body = transformCollectionToV2(collection);
            } else {
                ctx.body = collection;
            }
        });
    }
}

function addOriginToManifest(manifest: any, origin: string, prefix: string): Base {

    if (!manifest.id.startsWith('http')) {
        if (manifest.id.startsWith('/manifest/') || manifest.id.startsWith('/collection/')) {
            manifest.id = origin + prefix + manifest.id;
        } else {
            manifest.id = origin + manifest.id;
        }
    }

    for (const key of Object.keys(manifest)) {
        if (Array.isArray(manifest[key])) {
            for (const subManifest of manifest[key]) {
                addOriginToManifest(subManifest, origin, prefix);
            }
        }
    }

    return manifest;
}
