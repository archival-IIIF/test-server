import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
import {hasAccess} from '../lib/Security';
import {getAuthLogin, getAuthLoginSubFolder} from "./authLoginCommon";

router.get('/collection/authLogin', ctx => {
    ctx.body = getAuthLogin(ctx, prefix);
});

router.get('/collection/authLoginSubfolder', ctx => {
    ctx.body = getAuthLoginSubFolder(ctx, prefix);
});

export default router.routes();
