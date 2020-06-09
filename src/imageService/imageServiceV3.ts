import * as Router from 'koa-router';
import {responseFile} from "./imageService";

const prefix = '/image-service/v3'
const router: Router = new Router({prefix});
const imageWith = 1840;
const imageHeight = 1450;

router.get('/ariel/info.json', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/ariel');
});

router.get('/arielDark/info.json', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/arielDark');
});


router.get('/ariel', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/ariel');
});

router.get('/arielDark', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/arielDark');
});


router.get('/ariel/:region/:size/:rotation/:quality.:format', async ctx => {
    await responseFile(ctx, __dirname + '/Ariel_-_LoC_4a15521.jpg', imageWith, imageHeight);
});

router.get('/arielDark/:region/:size/:rotation/:quality.:format', async ctx => {
    await responseFile(ctx, __dirname + '/Ariel_-_LoC_4a15521_dark.jpg', imageWith, imageHeight);
});

function info(id: string) {
    return {
        id,
        type: "ImageService3",
        protocol: "http://iiif.io/api/image",
        width: imageWith,
        height: imageHeight,
        profile: 'level2',
        "@context": "http://iiif.io/api/image/3/context.json",
        preferredFormats: [ "jpg"],
        extraFormats: ["jpg", "png", "gif", "webp"],
        extraFeatures: ["canonicalLinkHeader", "profileLinkHeader", "mirroring", "rotationArbitrary", "regionSquare"],
        extraQualities: ["default", "color", "gray", "bitonal"]
    };
}

export default router.routes();
