import {ParameterizedContext} from "koa";
import {Resource} from "@archival-iiif/presentation-builder";
import FileManifest from "../../lib/FileManifest";
import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {defaultImage} from "../../lib/Image";


const logoManifest = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with logo', undefined, undefined, defaultImage);
    manifest.setLogo(new Resource(
        ctx.request.origin + '/logo',
        'Image',
        undefined,
        'image/jpeg',
        undefined,
        120,
        120
    ));

    return manifest;
}



export default getIIIFRouteTree([
    {
        path: '/manifest/logo',
        body: logoManifest,
        images: defaultImage
    }
]);
