const Router = require('koa-router');
const router = new Router();

router.get('/presentation/nestedStructure', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/nestedStructure',
        '@type': 'sc:Collection',
        label: 'Folder Level 1',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + '/presentation/nestedStructure11',
                '@type': 'sc:Collection',
                label: 'Folder Level 1.1',
            },
            {
                '@id': ctx.request.origin + '/presentation/nestedStructure12',
                '@type': 'sc:Collection',
                label: 'Folder Level 1.2',
            }
        ]
    };
});

router.get('/presentation/nestedStructure11', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/nestedStructure11',
        '@type': 'sc:Collection',
        label: 'Folder Level 1.1',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/nestedStructure',
        collections: [
            {
                '@id': ctx.request.origin + '/presentation/nestedStructure111',
                '@type': 'sc:Collection',
                label: 'Folder Level 1.1.1',
            }
        ]
    };
});

router.get('/presentation/nestedStructure111', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/nestedStructure111',
        '@type': 'sc:Collection',
        label: 'Folder Level 1.1.1',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/nestedStructure11',
        collections: [
            {
                '@id': ctx.request.origin + '/presentation/nestedStructure1111',
                '@type': 'sc:Collection',
                label: 'Folder Level 1.1.1.1',
            }
        ]
    };
});

router.get('/presentation/nestedStructure1111', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/nestedStructure1111',
        '@type': 'sc:Collection',
        label: 'Folder Level 1.1.1.1',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/nestedStructure111',
    };
});

router.get('/presentation/nestedStructure12', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/nestedStructure12',
        '@type': 'sc:Collection',
        label: 'Folder Level 1.2',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/nestedStructure',
    };
});


module.exports = router;
