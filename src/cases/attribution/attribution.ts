import {ParameterizedContext} from "koa";
import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {defaultImage} from "../../lib/Image";

const body = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with metadata', undefined, undefined, defaultImage);
    manifest.setAttribution('Provided by Example Organization');

    return manifest;
}

export default getIIIFRouteTree([
    {
        path: '/manifest/attribution',
        body,
        images: defaultImage
    }
]);
