import * as Router from 'koa-router';

const router: Router = new Router();

import download from '../lib/Download';
const path = require('path');


router.get('/file/txt', async  ctx => {
    const filePath = path.join(__dirname, 'test.txt');
    await download(ctx, filePath);
});

export default router.routes();
