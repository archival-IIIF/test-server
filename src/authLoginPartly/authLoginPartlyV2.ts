import * as Router from 'koa-router';
import {hasAccess} from '../lib/Security';
import {getAuthLoginPartly, getAuthLoginPartly1, getAuthLoginPartly2} from "./authLoginPartly";
import {transformCollectionToV2, transformManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authLoginPartly', ctx => {
    ctx.body = transformCollectionToV2(getAuthLoginPartly(ctx, prefix));
});

router.get('/collection/authLoginPartly1', ctx => {
    if (!hasAccess(ctx)) {
        ctx.status = 401;
    }

    ctx.body = transformCollectionToV2(getAuthLoginPartly1(ctx, prefix));
});

router.get('/manifest/authLoginPartly2', ctx => {
    if (!hasAccess(ctx)) {
        ctx.status = 401;
    }

    ctx.body = transformManifestToV2(getAuthLoginPartly2(ctx, prefix));
});

export default router.routes();

