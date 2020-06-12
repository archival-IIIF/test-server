import * as Router from 'koa-router';
import {loginPage, tokenPage, logoutPage} from "../auth/auth";
import {ParameterizedContext} from "koa";
import {cookieName, cookieToken, viewerToken} from "./authKioskCommon";
import authKioskV2 from "./authKioskV2";
import authKioskV3 from "./authKioskV3";

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

router.use(authKioskV2);
router.use(authKioskV3);

export default router.routes();
