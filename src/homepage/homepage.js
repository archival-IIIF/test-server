const Router = require('koa-router');
const router = new Router();
const {createReadStream} = require('fs');
const path = require('path');

router.get('/', async ctx => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'homepage.html'));
});

module.exports = router;
