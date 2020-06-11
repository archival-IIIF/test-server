import * as Router from 'koa-router';
import {
    getAuthClickThrough,
    getAuthClickThroughSubFolder,
} from "./authClickThroughCommon";
import {transformCollectionToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authClickThrough', ctx => {
    ctx.body = transformCollectionToV2(getAuthClickThrough(ctx, prefix));
});

router.get('/collection/authClickThroughSubfolder', ctx => {
    ctx.body = transformCollectionToV2( getAuthClickThroughSubFolder(ctx, prefix));
});

export default router.routes();
