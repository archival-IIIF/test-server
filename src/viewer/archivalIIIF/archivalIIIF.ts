import Router from '@koa/router';
import * as path from 'node:path';
import {createReadStream} from 'node:fs';
import type {Context} from "koa";

const router = new Router();

router.get('/archivalIIIF', async (ctx: Context) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'archivalIIIF.html'));
});

export default router.routes();
