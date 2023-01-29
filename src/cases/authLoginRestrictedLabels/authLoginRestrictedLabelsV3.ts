import Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
import {getAuthLogin, getAuthLoginSubFolder, getAuthLoginDegraded} from "./authLoginRestrictedLabelsCommon";

router.get('/collection/authLoginRestrictedLabels', ctx => {
    const result = getAuthLogin(ctx, prefix);
    if (result) {
        ctx.body = result;
    }
});

router.get('/collection/authLoginRestrictedLabels_degraded', ctx => {
    ctx.body = getAuthLoginDegraded(ctx, prefix);
});

router.get('/collection/authLoginRestrictedLabelsSubfolder', ctx => {
    ctx.body = getAuthLoginSubFolder(ctx, prefix);
});

export default router.routes();
