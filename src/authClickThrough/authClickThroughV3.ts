import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
import {getAuthClickThrough, getAuthClickThroughSubFolder} from "./authClickThroughCommon";

router.get('/collection/authClickThrough', ctx => {
    ctx.body = getAuthClickThrough(ctx, prefix);
});

router.get('/collection/authClickThroughSubfolder', ctx => {
    ctx.body = getAuthClickThroughSubFolder(ctx, prefix);
});

export default router.routes();
