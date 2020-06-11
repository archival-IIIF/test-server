import * as Router from 'koa-router';
import authLoginV2 from "./authLoginV2";
import authLoginV3 from "./authLoginV3";
import {cookieName, cookieToken, viewerToken, userToken} from "./authLoginCommon";
import {createReadStream} from "fs";
import * as path from 'path';
import {ParameterizedContext} from "koa";
import {loginPage, logoutPage, tokenPage} from "../auth/auth";
import {UserToken} from "../lib/Security";

const router: Router = new Router();


router.get('/login', (ctx: Router.RouterContext) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'token-login.html'));
});

router.post('/login', async (ctx: ParameterizedContext) => {

    const request: any = ctx.request;
    const token = request.body.token;
    if (token === userToken) {
        loginPage(ctx, cookieName, cookieToken);
    } else {
        loginPage(ctx);
    }
});

router.get('/token', async (ctx: ParameterizedContext) => {
    tokenPage(ctx, cookieName, cookieToken, viewerToken);
});

router.get('/logout', async (ctx: ParameterizedContext) => {
    logoutPage(ctx, cookieName);
});


router.use(authLoginV2);
router.use(authLoginV3);

export default router.routes();
