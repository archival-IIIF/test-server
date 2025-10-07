import Router from '@koa/router';
import * as path from 'path';

import download from '../../lib/Download';
import {Context} from "koa";
const router: Router = new Router();

router.get('/logo', async (ctx: Context) => {
    const filePath = path.join(__dirname, 'logo.png');
    await download(ctx, filePath);
});

export default router.routes();
