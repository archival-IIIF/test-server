import * as Router from 'koa-router';

const router: Router = new Router();

const fs = require('fs');
const path = require('path');
import download from '../lib/Download';
const dynamicDemoCommon = require('./dynamicDemoCommon');


router.get('/dynamicDemo/logo.png', async ctx => {

    if (!dynamicDemoCommon.hasLogo()) {
        ctx.throw(404)
    }

    await download(ctx, dynamicDemoCommon.getLogoPath());
});

export default router.routes();
