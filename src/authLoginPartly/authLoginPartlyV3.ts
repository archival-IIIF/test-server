import * as Router from 'koa-router';
import {hasAccess} from '../lib/Security';
import {getAuthLoginPartly, getAuthLoginPartly1, getAuthLoginPartly2} from "./authLoginPartly";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/authLoginPartly', ctx => {
    ctx.body = getAuthLoginPartly(ctx, prefix);
});

router.get('/collection/authLoginPartly1', ctx => {
    if (!hasAccess(ctx)) {
        ctx.status = 401;
    }

    ctx.body = getAuthLoginPartly1(ctx, prefix);
});

router.get('/manifest/authLoginPartly2', ctx => {
    if (!hasAccess(ctx)) {
        ctx.status = 401;
    }

    ctx.body = getAuthLoginPartly2(ctx, prefix);;
});

export default router.routes();

