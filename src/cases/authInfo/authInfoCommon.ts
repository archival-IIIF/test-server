import ImageManifest from "../../lib/ImageManifest";
import RootCollection from "../../lib/RootCollection";
import {ParameterizedContext} from "koa";

const imageWith = 1840;
const imageHeight = 1450;

export function getAuthInfo(ctx: ParameterizedContext, prefix: string) {
    const c = new RootCollection(ctx.request.origin + ctx.request.url, 'Open Collection with a locked info-json');
    c.setItems([getAuthInfo2(ctx, prefix)]);

    return c;
}

export function getAuthInfo2(ctx: ParameterizedContext, prefix: string) {
    const m = new ImageManifest(
        ctx.request.origin + prefix + '/manifest/authInfo2',
        ctx.request.origin + '/image-service/v2/authInfo',
        'test.png',
        imageWith,
        imageHeight
    );
    m.setParent(ctx.request.origin + prefix + '/collection/authInfo', 'Collection');

    return m;
}


