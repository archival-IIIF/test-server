import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {ParameterizedContext} from "koa";
import {defaultImage} from "../../lib/Image";

const body = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with metadata', undefined, undefined, defaultImage);
    manifest.setMetadata('Size', '1 MB');

    return manifest;
}

export default getIIIFRouteTree([
    {
        path: '/manifest/metadata',
        body,
        images: defaultImage
    }
]);
