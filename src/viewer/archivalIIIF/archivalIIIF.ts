import Router from 'koa-router';
import * as path from 'path';
import {createReadStream} from 'fs';

const router: Router = new Router();

router.get('/archivalIIIF', async (ctx: Router.RouterContext) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'archivalIIIF.html'));
});

export default router.routes();
