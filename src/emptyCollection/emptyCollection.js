const Router = require('koa-router');
const router = new Router();

router.get('/collection/emptyCollection', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/emptyCollection',
        '@type': 'sc:Collection',
        label: 'Empty collection test case',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});

module.exports = router;
