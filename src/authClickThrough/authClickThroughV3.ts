import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
import {getAuthClickThrough, getAuthClickThroughImage} from "./authClickThroughCommon";

router.get('/collection/authClickThrough', ctx => {
    ctx.body = getAuthClickThrough(ctx, prefix);
});

router.get('/manifest/authClickThroughImage', ctx => {
    ctx.body = getAuthClickThroughImage(ctx, prefix);
});

export default router.routes();
