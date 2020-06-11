import * as Router from 'koa-router';
import {loginPage, tokenPage, logoutPage} from "../auth/auth";
import {ParameterizedContext} from "koa";
import {cookieName, cookieToken, viewerToken} from "./authClickThroughCommon";
import authClickThroughV2 from "./authClickThroughV2";
import authClickThroughV3 from "./authClickThroughV3";

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

router.use(authClickThroughV2);
router.use(authClickThroughV3);

export default router.routes();
