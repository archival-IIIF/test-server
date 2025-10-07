import Router from '@koa/router';
import * as path from 'path';
import {createReadStream} from 'fs';
import {Context} from "koa";

const router: Router = new Router();

router.get('/archivalIIIF', async (ctx: Context) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'archivalIIIF.html'));
});

export default router.routes();
