import * as Router from 'koa-router';

const router: Router = new Router();

const fs = require('fs');
import * as path from 'path';
import download from '../lib/Download';
const dynamicDemoCommon = require('./dynamicDemoCommon');


router.get('/dynamicDemo/logo.png', async ctx => {

    if (!dynamicDemoCommon.hasLogo()) {
        ctx.throw(404)
    }

    await download(ctx, dynamicDemoCommon.getLogoPath());
});

export default router.routes();
