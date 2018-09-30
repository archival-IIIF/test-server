const Router = require('koa-router');
const router = new Router();
const {createReadStream} = require('fs');
const path = require('path');

router.get('/universalViewer', async ctx => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'universalViewer.html'));
});

module.exports = router;
