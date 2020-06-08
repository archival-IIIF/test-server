import * as Router from 'koa-router';
import {getAriel, getImage} from "./image";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/image', ctx => {
    ctx.body = getImage(ctx, prefix);
});

router.get('/manifest/ariel', ctx => {
    ctx.body = getAriel(ctx, prefix);
});

export default router.routes();
