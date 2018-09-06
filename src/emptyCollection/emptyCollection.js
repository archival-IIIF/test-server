const Router = require('koa-router');
const router = new Router();

router.get('/presentation/emptyCollection', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/emptyCollection',
        '@type': 'sc:Collection',
        label: 'Empty collection test case',
        '@context': 'http://iiif.io/api/presentation/2/context.json'
    };
});

module.exports = router;
