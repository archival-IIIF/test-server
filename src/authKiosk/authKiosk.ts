import * as Router from 'koa-router';
import {loginPage, tokenPage, logoutPage} from "../auth/auth";
import {ParameterizedContext} from "koa";
import {cookieName, cookieToken, getAuthKiosk, getAuthKioskService, viewerToken} from "./authKioskCommon";
import {addArialRoute} from "../imageService/imageBase";
import {transformCollectionToV2} from "../lib/Transform";

const router: Router = new Router();

router.get('/token/kiosk',  (ctx: Router.RouterContext) => {
    tokenPage(ctx, cookieName, cookieToken, viewerToken);
});

router.get('/login/kiosk',  (ctx: ParameterizedContext) => {
    loginPage(ctx, cookieName, cookieToken);
});

router.get('/logout/kiosk',  (ctx: ParameterizedContext) => {
    logoutPage(ctx, cookieName);
});

let prefix = '/iiif/v2';
router.get(prefix + '/collection/authKiosk', ctx => {
    ctx.body = transformCollectionToV2(getAuthKiosk(ctx, prefix));
});

prefix = '/iiif/v3';
router.get(prefix + '/collection/authKiosk', ctx => {
    ctx.body = getAuthKiosk(ctx, prefix);
});

addArialRoute(
    router,
    'authKioskImage',
    '/collection/authKiosk',
    getAuthKioskService,
    cookieName,
    cookieToken,
    viewerToken
);

export default router.routes();
