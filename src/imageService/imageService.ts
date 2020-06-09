import {ParameterizedContext} from "koa";
import serveImage from "./internal";

export async function responseFile(ctx: ParameterizedContext, uri: string, width: number, height: number) {

    const item = {uri, width, height};

    let result = await serveImage(item, {
        region: ctx.params.region,
        size: ctx.params.size,
        rotation: ctx.params.rotation,
        quality: ctx.params.quality,
        format: ctx.params.format
    });

    ctx.body = result.image;
    ctx.status = result.status;
    ctx.set('Content-Type', result.contentType);
    ctx.set('Content-Length', result.contentLength.toString());
}
