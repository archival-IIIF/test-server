import {ParameterizedContext} from "koa";
import {serveImage} from "@archival-iiif/image-server-core";
import {imageSize} from "image-size";

export async function responseFile(ctx: ParameterizedContext, uri: string) {

    let result = await serveImage(uri, null, {
        region: ctx.params.region,
        size: ctx.params.size,
        rotation: ctx.params.rotation,
        quality: ctx.params.quality,
        format: ctx.params.format
    });

    ctx.body = result.image;
    //ctx.status = result.status;
    ctx.set('Content-Type', result.contentType);
    ctx.set('Content-Length', result.contentLength.toString());

    return result;
}
