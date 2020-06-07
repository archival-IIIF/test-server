import * as Router from 'koa-router';

const router: Router = new Router();

router.get('/collection/emptyCollection', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + ctx.request.url,
        '@type': 'sc:Collection',
        label: 'Empty collection test case',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});

router.get('/iiif/v3/collection/emptyCollection', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Empty collection test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
    };
});

export default router.routes();
