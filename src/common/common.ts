import * as Router from 'koa-router';

const router: Router = new Router();

import download from '../lib/Download';
import * as path from 'path';


router.get('/file/txt', async  ctx => {
    const filePath = path.join(__dirname, 'test.txt');
    await download(ctx, filePath);
});

router.get('/file/loreIpsum', async  ctx => {
    const filePath = path.join(__dirname, 'lore_ipsum.txt');
    await download(ctx, filePath);
});

export default router.routes();
