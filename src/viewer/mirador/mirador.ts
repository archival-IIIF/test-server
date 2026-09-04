import Router from '@koa/router';
import * as path from 'node:path';
import {createReadStream} from 'node:fs';
import type {Context} from "koa";

const router = new Router();

router.get('/mirador', async (ctx: Context) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'mirador.html'));
});

export default router.routes();
