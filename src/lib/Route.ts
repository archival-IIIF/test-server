import * as Router from "koa-router";
import Collection from "../presentation-builder/v3/Collection";
import {transformCollectionToV2} from "./Transform";
import Base from "../presentation-builder/v3/Base";
import {hasAccess} from "./Security";
import {cloneDeep} from 'lodash';

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

            const collectionWithOrigin = cloneDeep(collection)
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
