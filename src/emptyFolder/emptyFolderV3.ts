import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/emptyFolder', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Empty folder test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        items: [
            {
                id: ctx.request.origin + prefix + '/collection/emptyFolder2',
                type: 'Collection',
                label: {en: ['Empty folder']},
            }
        ]
    };
});

router.get('/collection/emptyFolder2', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Empty folder']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/emptyFolder', type: 'Collection'}]
    };
});

export default router.routes();
