import * as Router from 'koa-router';
import * as fs from 'fs';
import * as path from 'path';
import download from '../lib/Download';
import dynamicDemoCommon from './dynamicDemoCommon';
import {imageSize} from 'image-size';
import {info} from "../imageService/imageServiceV2";
import {responseFile} from "../imageService/imageService";

const router: Router = new Router();


router.get('/f/dynamicDemo/:id', async ctx => {

    const id = dynamicDemoCommon.decode(ctx.params.id);
    const objectPath = path.join(dynamicDemoCommon.getDemoDataPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }

    if (fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404);
    }

    await download(ctx, objectPath);
});

router.get('/image/dynamicDemo/:image/:region/:size/:rotation/:quality.:format', async ctx => {

    const tilePath = path.join(
        dynamicDemoCommon.getCachePath(),
        ctx.params.image,
        ctx.params.region,
        ctx.params.size,
        ctx.params.rotation,
        ctx.params.quality + '.' + ctx.params.format
    );

    if (fs.existsSync(tilePath)) {
        await download(ctx, tilePath);
        return;
    }

    const id = dynamicDemoCommon.decode(ctx.params.image);
    const objectPath = path.join(dynamicDemoCommon.getDemoDataPath(), id);

    const dimensions = imageSize(dynamicDemoCommon.getFullPath(ctx.params.image));
    const result = await responseFile(ctx, objectPath, dimensions.width, dimensions.height);

    fs.mkdirSync(path.dirname(tilePath), {recursive: true});
    fs.writeFileSync(tilePath, result.image);
});

router.get('/image/dynamicDemo/:image/info.json', ctx => {
    const dimensions = imageSize(dynamicDemoCommon.getFullPath(ctx.params.image));
    ctx.body = info(
        ctx.request.origin + '/image/dynamicDemo/' + ctx.params.image,
        dimensions.width,
        dimensions.height
    );
});

export default router.routes();
