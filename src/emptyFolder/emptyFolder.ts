import * as Router from 'koa-router';

const router: Router = new Router();

router.get('/collection/emptyFolder', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/emptyFolder',
        '@type': 'sc:Collection',
        label: 'Empty folder test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/emptyFolder2',
                '@type': 'sc:Collection',
                label: 'Empty folder',
            }
        ]
    };
});

router.get('/collection/emptyFolder2', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/emptyFolder2',
        '@type': 'sc:Collection',
        label: 'Empty folder',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/emptyFolder',
    };
});

export default router.routes();
