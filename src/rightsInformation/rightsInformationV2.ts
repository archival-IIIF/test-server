import * as Router from 'koa-router';
import {
    getFileWithAttribution, getRightsInformation, getFileWithLicense, getFileWithoutLicense
} from "./rightsInformation";
import {transformCollectionToV2, transformFileManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/rightsInformation', (ctx: Router.RouterContext) => {
    ctx.body = transformCollectionToV2(getRightsInformation(ctx, prefix));
});


router.get('/manifest/fileWithAttribution', ctx => {
    ctx.body = transformFileManifestToV2(getFileWithAttribution(ctx, prefix));
});


router.get('/manifest/fileWithLicense', ctx => {
    ctx.body = transformFileManifestToV2(getFileWithLicense(ctx, prefix));
});


router.get('/manifest/fileWithoutLicense', ctx => {
    ctx.body = transformFileManifestToV2(getFileWithoutLicense(ctx, prefix));
});

export default router.routes();
