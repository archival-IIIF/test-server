import * as Router from 'koa-router';
import {
    getAuthClickThrough,
    getAuthClickThroughImage,
} from "./authClickThroughCommon";
import {transformCollectionToV2, transformImageManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authClickThrough', ctx => {
    ctx.body = transformCollectionToV2(getAuthClickThrough(ctx, prefix));
});

router.get('/collection/authClickThroughImage', ctx => {
    ctx.body = transformImageManifestToV2( getAuthClickThroughImage(ctx, prefix));
});

export default router.routes();
