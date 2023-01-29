import Router from "koa-router";
import {loginPage, logoutPage, tokenPage} from "./auth";
import {ParameterizedContext} from "koa";
import {AuthService} from "@archival-iiif/presentation-builder";

export const cookieName = 'access-kiosk';
export const cookieToken = 'kiosk-cookie-abc';
export const viewerToken = 'kiosk-viewer-123';


export function getAuthKioskService(ctx: ParameterizedContext) {
    const authService = new AuthService(
        ctx.request.origin + '/login/kiosk',
        '',
        'http://iiif.io/api/auth/1/kiosk'
    );
    const tokenService = new AuthService(
        ctx.request.origin + '/token/kiosk',
        '',
        'http://iiif.io/api/auth/1/token'
    );
    const logoutService = new AuthService(
        ctx.request.origin + '/logout/kiosk',
        '',
        'http://iiif.io/api/auth/1/logout'
    );
    logoutService.label = 'Logout from Example Institution';

    authService.label = 'Internal cookie granting service';
    authService.failureHeader = 'Ooops!';
    authService.failureDescription = 'Call Bob at ext. 1234 to reboot the cookie server';
    authService.service = []
    authService.service = [tokenService, logoutService];

    return authService;
}

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

export default router.routes();
