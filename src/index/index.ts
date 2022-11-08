import * as Router from 'koa-router';
import {createReadStream} from 'fs';
import * as path from 'path';

const router: Router = new Router();


router.get('/', async ctx => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'index.html'));
});

router.get('/index.css', async ctx => {
    ctx.type = 'text/css';
    ctx.body = createReadStream(path.join(__dirname, 'index.css'));
});

router.get('/main.js', async ctx => {
    ctx.type = 'text/javascript';
    ctx.body = createReadStream(path.join(__dirname, 'main.js'));
});

router.get('/testCases.json', async ctx => {
    ctx.type = 'application/json';
    ctx.body = createReadStream(path.join(__dirname, 'testCases.json'));
});

export default router.routes();

