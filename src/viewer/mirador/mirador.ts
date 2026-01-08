import Router from '@koa/router';
import * as path from 'path';
import {createReadStream} from 'fs';
import {Context} from "koa";

const router = new Router();

router.get('/mirador', async (ctx: Context) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'mirador.html'));
});

export default router.routes();
