const Router = require('koa-router');
const router = new Router();

const download = require('../lib/Download');
const path = require('path');


router.get('/file/txt', async  ctx => {
    const filePath = path.join(__dirname, 'test.txt');
    await download(ctx, filePath);
});

module.exports = router;
