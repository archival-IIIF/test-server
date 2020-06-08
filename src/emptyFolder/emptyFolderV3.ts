import * as Router from 'koa-router';
import Collection from "../presentation-builder/v3/Collection";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/emptyFolder', ctx => {
    const c = new Collection(ctx.request.origin + ctx.request.url, 'Empty folder test case');
    c.setContext('http://iiif.io/api/presentation/3/context.json');
    c.setItems([
        new Collection(ctx.request.origin + prefix + '/collection/emptyFolder2', 'Empty folder')
    ])
    ctx.body = c;
});

router.get('/collection/emptyFolder2', ctx => {
    const c = new Collection(ctx.request.origin + ctx.request.url, 'Empty folder');
    c.setContext('http://iiif.io/api/presentation/3/context.json');
    c.setParent(ctx.request.origin + prefix + '/collection/emptyFolder', 'Collection');
    ctx.body = c;
});

export default router.routes();
