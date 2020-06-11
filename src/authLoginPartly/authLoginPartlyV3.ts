import * as Router from 'koa-router';
import {getAuthLoginPartly, getAuthLoginPartly1, getAuthLoginPartly2} from "./authLoginPartlyCommon";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/authLoginPartly', ctx => {
    ctx.body = getAuthLoginPartly(ctx, prefix);
});

router.get('/collection/authLoginPartly1', ctx => {
    ctx.body = getAuthLoginPartly1(ctx, prefix);
});

router.get('/manifest/authLoginPartly2', ctx => {
    ctx.body = getAuthLoginPartly2(ctx, prefix);
});

export default router.routes();

