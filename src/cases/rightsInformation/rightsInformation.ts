import type {ParameterizedContext} from "koa";
import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {defaultImage} from "../../lib/Image";

const body = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with metadata', undefined, undefined, defaultImage);
    manifest.setRights('https://creativecommons.org/licenses/by-sa/3.0/');

    return manifest;
}

export default getIIIFRouteTree([
    {
        path: '/manifest/rightsInformation',
        body,
        images: defaultImage
    }
]);
