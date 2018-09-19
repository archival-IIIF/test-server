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
        label: 'Collection without id',
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

router.get('/collection/missingSubfolder', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/missingSubfolder',
        '@type': 'sc:Collection',
        label: 'Missing subfolder test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/missingSubfolder2',
                '@type': 'sc:Collection',
                label: 'Missing subfolder',
            }
        ]
    };
});

router.get('/collection/missingParent', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/missingParent',
        '@type': 'sc:Collection',
        label: 'Missing parent test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/missingParent2',
    };
});

router.get('/collection/loop', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/loop',
        '@type': 'sc:Collection',
        label: 'Loop test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/loop',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/loop',
                '@type': 'sc:Collection',
                label: 'Loop subfolder',
            }
        ]
    };
});

module.exports = router;
