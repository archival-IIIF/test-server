const Router = require('koa-router');
const router = new Router();

router.get('/collection/missingManifest', ctx => {
    ctx.status = 404;
    ctx.body = 'Missing';
});

router.get('/collection/noJson', ctx => {
    ctx.body = 'No json';
});

router.get('/collection/noId', ctx => {
    ctx.body = {
        '@type': 'sc:Collection',
        label: 'Empty collection test case',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});

router.get('/collection/noLabel', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/noLabel',
        '@type': 'sc:Collection',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});

module.exports = router;
