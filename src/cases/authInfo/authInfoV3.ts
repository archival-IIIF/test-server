import * as Router from 'koa-router';
import {getAuthInfo, getAuthInfo2} from "./authInfoCommon";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});


router.get('/collection/authInfo', ctx => {
    ctx.body = getAuthInfo(ctx, prefix);
});

router.get('/manifest/authInfo2', ctx => {
    ctx.body = getAuthInfo2(ctx, prefix);
});

export default router.routes();
