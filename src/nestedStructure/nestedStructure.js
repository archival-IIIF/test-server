const Router = require('koa-router');
const router = new Router();

router.get('/collection/nestedStructure', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/nestedStructure',
        '@type': 'sc:Collection',
        label: 'Folder Level 1',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/nestedStructure11',
                '@type': 'sc:Collection',
                label: 'Folder Level 1.1',
            },
            {
                '@id': ctx.request.origin + '/collection/nestedStructure12',
                '@type': 'sc:Collection',
                label: 'Folder Level 1.2',
            }
        ]
    };
});

router.get('/collection/nestedStructure11', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/nestedStructure11',
        '@type': 'sc:Collection',
        label: 'Folder Level 1.1',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/nestedStructure',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/nestedStructure111',
                '@type': 'sc:Collection',
                label: 'Folder Level 1.1.1',
            }
        ]
    };
});

router.get('/collection/nestedStructure111', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/nestedStructure111',
        '@type': 'sc:Collection',
        label: 'Folder Level 1.1.1',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/nestedStructure11',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/nestedStructure1111',
                '@type': 'sc:Collection',
                label: 'Folder Level 1.1.1.1',
            }
        ]
    };
});

router.get('/collection/nestedStructure1111', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/nestedStructure1111',
        '@type': 'sc:Collection',
        label: 'Folder Level 1.1.1.1',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/nestedStructure111',
    };
});

router.get('/collection/nestedStructure12', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/nestedStructure12',
        '@type': 'sc:Collection',
        label: 'Folder Level 1.2',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/nestedStructure',
    };
});


module.exports = router;
