import * as Router from 'koa-router';

const router: Router = new Router();

router.get('/collection/emptyCollection', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/emptyCollection',
        '@type': 'sc:Collection',
        label: 'Empty collection test case',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});

export default router.routes();
