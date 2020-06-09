import * as Router from 'koa-router';
import serveImage from './internal';
import {responseFile} from "./imageService";

const prefix = '/image-service/v2'
const router: Router = new Router({prefix});
const imageWith = 1840;
const imageHeight = 1450;

router.get('/ariel', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/ariel', imageWith, imageHeight);
});

router.get('/ariel/info.json', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/ariel', imageWith, imageHeight);
});

router.get('/arielDark', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/ariel', imageWith, imageHeight);
});

router.get('/arielDark/info.json', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/arielDark', imageWith, imageHeight);
});


router.get('/ariel/:region/:size/:rotation/:quality.:format', async ctx => {
    await responseFile(ctx, __dirname + '/Ariel_-_LoC_4a15521.jpg', imageWith, imageHeight);
});

router.get('/arielDark/:region/:size/:rotation/:quality.:format', async ctx => {
    await responseFile(ctx, __dirname + '/Ariel_-_LoC_4a15521_dark.jpg', imageWith, imageHeight);
});

export function info(id: string, width: number, height: number): any {

    return {
        '@id': id,
        protocol: "http://iiif.io/api/image",
        width,
        height,
        sizes: [],
        "@context": "http://iiif.io/api/image/2/context.json",
        profile: [
            "http://iiif.io/api/image/2/level2.json",
            {
                supports: ["canonicalLinkHeader", "profileLinkHeader", "mirroring", "rotationArbitrary", "regionSquare"],
                qualities: ["default", "color", "gray", "bitonal"],
                formats: ["jpg", "png", "gif", "webp"]
            }
        ]
    };
}

router.get('/ariel/:region/:size/:rotation/:quality.:format', async ctx => {
    await responseFile(ctx, __dirname + '/Ariel_-_LoC_4a15521.jpg', imageWith, imageHeight);
});

export default router.routes();
