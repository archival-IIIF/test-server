import type {ParameterizedContext} from "koa";
import {serveImage} from "@archival-iiif/image-server-core";

const MAX_IMAGE_SIZE = getMaxImageSize();

function getMaxImageSize(): number {
    const value = Number.parseInt(process.env.MAX_IMAGE_SIZE ?? '5000', 10);
    return value > 0 ? value : 5000;
}

/**
 * Accepts the IIIF Image API size syntax without upscaling
 * ("max", "full", "w,", ",h", "w,h", "!w,h", "pct:n") and rejects
 * requested dimensions above MAX_IMAGE_SIZE, so every request stays cheap to render.
 */
export function isAllowedSize(size: string): boolean {
    if (size === 'max' || size === 'full') {
        return true;
    }

    const pct = /^pct:(\d+(\.\d+)?)$/.exec(size);
    if (pct) {
        const value = Number.parseFloat(pct[1]);
        return value > 0 && value <= 100;
    }

    const dims = /^!?(\d*),(\d*)$/.exec(size);
    if (!dims || (dims[1] === '' && dims[2] === '')) {
        return false;
    }

    return [dims[1], dims[2]]
        .filter((v) => v !== '')
        .every((v) => {
            const n = Number.parseInt(v, 10);
            return n > 0 && n <= MAX_IMAGE_SIZE;
        });
}

export async function responseFile(ctx: ParameterizedContext, uri: string) {

    if (!isAllowedSize(ctx.params.size)) {
        ctx.throw(400, 'Invalid or too large size');
    }

    const result = await serveImage(uri, null, {
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
