const Router = require('koa-router');
const router = new Router();

router.get('/presentation/emptyFolder', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/emptyFolder',
        '@type': 'sc:Collection',
        label: 'Empty folder test case',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + '/presentation/emptyFolder2',
                '@type': 'sc:Collection',
                label: 'Empty folder',
            }
        ]
    };
});

router.get('/presentation/emptyFolder2', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/emptyFolder2',
        '@type': 'sc:Collection',
        label: 'Empty folder',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/emptyFolder',
    };
});

module.exports = router;
