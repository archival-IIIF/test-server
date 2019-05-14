const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const download = require('../lib/Download');
const dynamicDemoCommon = require('./dynamicDemoCommon');


router.get('/dynamicDemo/logo.png', async ctx => {

    if (!dynamicDemoCommon.hasLogo()) {
        ctx.throw(404)
    }

    await download(ctx, dynamicDemoCommon.getLogoPath());
});

module.exports = router;
