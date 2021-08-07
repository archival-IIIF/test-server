import {ParameterizedContext} from "koa";
import {AuthService} from "@archival-iiif/presentation-builder";
import * as Router from "koa-router";
import {createReadStream} from "fs";
import * as path from "path";
import {loginPage, logoutPage, tokenPage} from "./auth";

export const cookieName = 'access';
export const cookieToken = '4321';
export const viewerToken = 'abcd';
export const userToken = '1234';

export function getAuthLoginService(ctx?: ParameterizedContext) {

    const  origin = ctx ? ctx.request.origin : '';

    const authService = new AuthService(
        origin + '/login',
        undefined,
        'http://iiif.io/api/auth/1/login'
    );
    const tokenService = new AuthService(
        origin + '/token',
        undefined,
        'http://iiif.io/api/auth/1/token'
    );
    const logoutService = new AuthService(
        origin + '/logout',
        undefined,
        'http://iiif.io/api/auth/1/logout'
    );
    logoutService.label = 'Logout from Example Institution';

    authService.label = 'Login to Example Institution';
    authService.header = 'Please Log In';
    authService.description = 'Example Institution requires that you log in with your example account to view this content.';
    authService.confirmLabel = 'Login';
    authService.failureHeader = 'Authentication Failed';
    authService.failureDescription = 'The code provided is not valid!';
    authService.service = []
    authService.service = [tokenService, logoutService];

    return authService;
}

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

export default router.routes();

