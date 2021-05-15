import * as Router from 'koa-router';
import {
    getFileWithAttribution, getRightsInformation, getFileWithLicense, getFileWithoutLicense
} from "./rightsInformation";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/rightsInformation', (ctx: Router.RouterContext) => {
    ctx.body = getRightsInformation(ctx, prefix);
});


router.get('/manifest/fileWithAttribution', ctx => {
    ctx.body = getFileWithAttribution(ctx, prefix);
});


router.get('/manifest/fileWithLicense', ctx => {
    ctx.body = getFileWithLicense(ctx, prefix);
});


router.get('/manifest/fileWithoutLicense', ctx => {
    ctx.body = getFileWithoutLicense(ctx, prefix);
});

export default router.routes();
