import * as Router from 'koa-router';

const router: Router = new Router();

const {createReadStream} = require('fs');
import * as path from 'path';

router.get('/', async ctx => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'homepage.html'));
});

export default router.routes();

