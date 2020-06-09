import * as Router from 'koa-router';
import serveImage from './internal';

const prefix = '/image-service/v2'
const router: Router = new Router({prefix});
const imageWith = 1840;
const imageHeight = 1450;

router.get('/ariel', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/ariel');
});

router.get('/ariel/info.json', ctx => {
    ctx.body = info(ctx.request.origin + prefix + '/ariel');
});

function info(id: string): any {
    return {
        '@id': id,
        protocol: "http://iiif.io/api/image",
        width: imageWith,
        height: imageHeight,
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


    const item = {
        uri: __dirname + '/Ariel_-_LoC_4a15521.jpg',
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
