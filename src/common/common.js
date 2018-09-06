const Router = require('koa-router');
const router = new Router();

const path = require('path');
const mime = require('mime-types');
const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const HttpError = require('../lib/HttpError');

router.get('/file/txt', async  ctx => {
    try {
        let filePath = './src/common/test.txt';
        ctx.set('Content-Type', mime.contentType(path.basename(filePath)));
        ctx.body = await readFileAsync(filePath);
    }
    catch (err) {
        throw new HttpError(404);
    }
});

module.exports = router;
