import Router from 'koa-router';
import * as path from 'path';
import {createReadStream} from 'fs';

const router: Router = new Router();

router.get('/universalViewer', async (ctx: Router.RouterContext) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'universalViewer.html'));
});

export default router.routes();
