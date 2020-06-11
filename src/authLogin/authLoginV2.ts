import * as Router from 'koa-router';
import {hasAccess} from '../lib/Security';
import {getAuthLogin, getAuthLoginSubFolder} from "./authLoginCommon";
import {transformCollectionToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authLogin', ctx => {
    ctx.body = transformCollectionToV2(getAuthLogin(ctx, prefix));
});

router.get('/collection/authLoginSubfolder', ctx => {
    ctx.body = transformCollectionToV2(getAuthLoginSubFolder(ctx, prefix));
});

export default router.routes();
