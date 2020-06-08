import * as Router from 'koa-router';
import {getFileWithLogo, getFileWithoutLogo, getLogo} from "./logo";
import {transformCollectionToV2, transformFileManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/logo', ctx => {
    ctx.body = transformCollectionToV2(getLogo(ctx, prefix));
});

router.get('/manifest/fileWithLogo', ctx => {
    ctx.body = transformFileManifestToV2(getFileWithLogo(ctx, prefix));
});

router.get('/manifest/fileWithoutLogo', ctx => {
    ctx.body = transformFileManifestToV2(getFileWithoutLogo(ctx, prefix));
});

export default router.routes();
