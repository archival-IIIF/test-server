import * as Router from 'koa-router';
import {getAuthInfo, getAuthInfo2} from "./authInfo";
import {transformCollectionToV2, transformImageManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});


router.get('/collection/authInfo', ctx => {
    ctx.body = transformCollectionToV2(getAuthInfo(ctx, prefix));
});

router.get('/manifest/authInfo2', ctx => {
    ctx.body = transformImageManifestToV2(getAuthInfo2(ctx, prefix));
});

export default router.routes();