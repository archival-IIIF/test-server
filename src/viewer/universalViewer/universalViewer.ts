import Router from '@koa/router';
import * as path from 'node:path';
import {createReadStream} from 'node:fs';
import type {Context} from "koa";

const router = new Router();

router.get('/universalViewer', async (ctx: Context) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'universalViewer.html'));
});

export default router.routes();
