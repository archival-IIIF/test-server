import * as Router from 'koa-router';
import {getMultiPage, getMultiPage1} from "./multiPage";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});


router.get('/collection/multiPage', ctx => {
    ctx.body = getMultiPage(ctx, prefix);
});

router.get('/manifest/multiPage1', ctx => {
    ctx.body = getMultiPage1(ctx, prefix);
});


export default router.routes();
