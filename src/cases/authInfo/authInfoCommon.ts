import ImageManifest from "../../lib/ImageManifest";
import RootCollection from "../../lib/RootCollection";
import {ParameterizedContext} from "koa";
import getBaseUrl from "../../lib/BaseUrl";

const imageWith = 1840;
const imageHeight = 1450;

export function getAuthInfo(ctx: ParameterizedContext, prefix: string) {
    const c = new RootCollection(getBaseUrl(ctx) + ctx.request.url, 'Open Collection with a locked info-json');
    c.setItems([getAuthInfo2(ctx, prefix)]);

    return c;
}

export function getAuthInfo2(ctx: ParameterizedContext, prefix: string) {
    const m = new ImageManifest(
        getBaseUrl(ctx) + prefix + '/manifest/authInfo2',
        getBaseUrl(ctx) + '/image-service/v2/authInfo',
        'test.png',
        imageWith,
        imageHeight
    );
    m.setParent(getBaseUrl(ctx) + prefix + '/collection/authInfo', 'Collection');

    return m;
}


