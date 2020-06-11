import * as Router from 'koa-router';
import {getAuthLoginPartly, getAuthLoginPartly1, getAuthLoginPartly2} from "./authLoginPartlyCommon";
import {transformCollectionToV2, transformManifestToV2} from "../lib/Transform";


const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authLoginPartly', ctx => {
    ctx.body = transformCollectionToV2(getAuthLoginPartly(ctx, prefix));
});

router.get('/collection/authLoginPartly1', ctx => {
    ctx.body = transformCollectionToV2(getAuthLoginPartly1(ctx, prefix));
});

router.get('/manifest/authLoginPartly2', ctx => {
    ctx.body = transformManifestToV2(getAuthLoginPartly2(ctx, prefix));
});

export default router.routes();

