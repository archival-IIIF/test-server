import Router from 'koa-router';
import {getAuthLogin, getAuthLoginDegraded, getAuthLoginSubFolder} from "./authLoginRestrictedLabelsCommon";
import {transformCollectionToV2} from "../../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authLoginRestrictedLabels', ctx => {
    const result = getAuthLogin(ctx, prefix);
    if (result) {
        ctx.body = transformCollectionToV2(result);
    }
});

router.get('/collection/authLoginRestrictedLabels_degraded', ctx => {
    ctx.body = transformCollectionToV2(getAuthLoginDegraded(ctx, prefix));
});

router.get('/collection/authLoginRestrictedLabelsSubfolder', ctx => {
    ctx.body = transformCollectionToV2(getAuthLoginSubFolder(ctx, prefix));
});

export default router.routes();
