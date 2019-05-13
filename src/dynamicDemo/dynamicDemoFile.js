const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const download = require('../lib/Download');
const dynamicDemoCommon = require('./dynamicDemoCommon');
const serveImage = require('../image/internal');
const sizeOf = require('image-size');

router.get('/f/dynamicDemo/:id', async ctx => {

    const id = dynamicDemoCommon.decode(ctx.params.id);
    const objectPath = path.join(dynamicDemoCommon.getDemoPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }

    if (fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404);
    }

    await download(ctx, objectPath);
});

router.get('/image/dynamicDemo/:image/:region/:size/:rotation/:quality.:format', async ctx => {


    const id = dynamicDemoCommon.decode(ctx.params.image);
    const objectPath = path.join(dynamicDemoCommon.getDemoPath(), id);

    const item = {
        uri: objectPath
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
    ctx.set('Content-Length', result.contentLength);
});

router.get('/image/dynamicDemo/:image/info.json', ctx => {
    //const imageWith = 1674;
    //const imageHeight = 381;
    const dimensions = sizeOf(dynamicDemoCommon.getFullPath(ctx.params.image));
    const imageWith = dimensions.width;
    const imageHeight = dimensions.height;
    ctx.body = {
        '@id': ctx.request.origin + '/image/dynamicDemo/' + ctx.params.image,
        "protocol": "http://iiif.io/api/image",
        "width": imageWith,
        "height": imageHeight,
        "sizes": [],
        "@context": "http://iiif.io/api/image/2/context.json",
        "profile": [
            "http://iiif.io/api/image/2/level2.json",
            {
                "supports": ["canonicalLinkHeader", "profileLinkHeader", "mirroring", "rotationArbitrary", "regionSquare"],
                "qualities": ["default", "color", "gray", "bitonal"],
                "formats": ["jpg", "png", "gif", "webp"]
            }
        ]
    };
});

module.exports = router;
