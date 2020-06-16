import * as Router from 'koa-router';
import {loginPage, tokenPage, logoutPage} from "../auth/auth";
import {ParameterizedContext} from "koa";
import {cookieName, cookieToken, getAuthClickThrough, viewerToken} from "./authClickThroughCommon";
import {addArialRoute} from "../imageService/imageBase";
import {getAuthLoginService} from "../authLogin/authLoginCommon";
import {transformCollectionToV2} from "../lib/Transform";

const router: Router = new Router();

router.get('/token/clickThrough',  (ctx: Router.RouterContext) => {
    tokenPage(ctx, cookieName, cookieToken, viewerToken);
});

router.get('/login/clickThrough',  (ctx: ParameterizedContext) => {
    loginPage(ctx, cookieName, cookieToken);
});

router.get('/logout/clickThrough',  (ctx: ParameterizedContext) => {
    logoutPage(ctx, cookieName);
});

let prefix = '/iiif/v2';
router.get('/collection/authClickThrough', ctx => {
    ctx.body = transformCollectionToV2(getAuthClickThrough(ctx, prefix));
});

prefix = '/iiif/v3';
router.get('/collection/authClickThrough', ctx => {
    ctx.body = getAuthClickThrough(ctx, prefix);
});

addArialRoute(
    router,
    'authClickThroughImage',
    '/collection/authClickThrough',
    getAuthLoginService,
    cookieName,
    cookieToken,
    viewerToken
);

export default router.routes();
