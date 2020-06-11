import * as Router from 'koa-router';
import {getAuthMixed, getAuthMixedLogin, getAuthMixedClickThrough} from "./authMixedCommon";
import {transformCollectionToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authMixed', ctx => {
    ctx.body = transformCollectionToV2(getAuthMixed(ctx, prefix));
});

router.get('/collection/authMixedLogin', ctx => {
    ctx.body = transformCollectionToV2(getAuthMixedLogin(ctx, prefix));
});

router.get('/collection/authMixedClickTrough', ctx => {
    ctx.body = transformCollectionToV2(getAuthMixedClickThrough(ctx, prefix));
});

export default router.routes();

