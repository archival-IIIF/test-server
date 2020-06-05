import * as Router from 'koa-router';
import serveImage from "../internal";
import {ParameterizedContext} from "koa";

const router: Router = new Router();
const imageWith = 1840;
const imageHeight = 1450;


router.get('/image-service/v3/ariel/info.json', ctx => {
    info(ctx);
});

router.get('/image-service/v3/ariel', ctx => {
    info(ctx);
});

function info(ctx: ParameterizedContext) {
    ctx.body = {
        id: ctx.request.origin + '/image-service/v3/ariel',
        type: "ImageService3",
        protocol: "http://iiif.io/api/image",
        width: imageWith,
        height: imageHeight,
        sizes: [],
        "@context": "http://iiif.io/api/image/3/context.json",
        preferredFormats: [ "jpg"],
        extraFormats: ["jpg", "png", "gif", "webp"],
        extraFeatures: ["canonicalLinkHeader", "profileLinkHeader", "mirroring", "rotationArbitrary", "regionSquare"],
        extraQualities: ["default", "color", "gray", "bitonal"]
    };
}


router.get('/image-service/v3/ariel/:region/:size/:rotation/:quality.:format', async ctx => {


    const item = {
        uri: __dirname + '/../Ariel_-_LoC_4a15521.jpg',
        width: imageWith,
        height: imageHeight
    };

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
});

export default router.routes();
