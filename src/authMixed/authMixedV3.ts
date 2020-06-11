import * as Router from 'koa-router';
import {getAuthMixed, getAuthMixedLogin, getAuthMixedClickThrough} from "./authMixedCommon";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/authMixed', ctx => {
    ctx.body = getAuthMixed(ctx, prefix);
});

router.get('/collection/authMixedLogin', ctx => {
    ctx.body = getAuthMixedLogin(ctx, prefix);
});

router.get('/collection/authMixedClickThrough', ctx => {
    ctx.body = getAuthMixedClickThrough(ctx, prefix);
});

export default router.routes();

