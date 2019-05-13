const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const download = require('../lib/Download');
const dynamicDemoCommon = require('./dynamicDemoCommon');


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

module.exports = router;
