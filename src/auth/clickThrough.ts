import Router from 'koa-router';
import {loginPage, tokenPage, logoutPage} from "../auth/auth";
import {ParameterizedContext} from "koa";
import {AuthService} from "@archival-iiif/presentation-builder";
import getBaseUrl from "../lib/BaseUrl";

const router: Router = new Router();

export const cookieName = 'access-click-through';
export const cookieToken = 'click-through-cookie-abc';
export const viewerToken = 'click-through-viewer-123';

router.get('/token/clickThrough',  (ctx: Router.RouterContext) => {
    tokenPage(ctx, cookieName, cookieToken, viewerToken);
});

router.get('/login/clickThrough',  (ctx: ParameterizedContext) => {
    loginPage(ctx, cookieName, cookieToken);
});

router.get('/logout/clickThrough',  (ctx: ParameterizedContext) => {
    logoutPage(ctx, cookieName);
});


export function getAuthClickThroughService(ctx: ParameterizedContext) {
    const authService = new AuthService(
        getBaseUrl(ctx) + '/login/clickThrough',
        '',
        'http://iiif.io/api/auth/1/clickthrough'
    );
    const tokenService = new AuthService(
        getBaseUrl(ctx) + '/token/clickThrough',
        '',
        'http://iiif.io/api/auth/1/token'
    );
    const logoutService = new AuthService(
        getBaseUrl(ctx) + '/logout/clickThrough',
        '',
        'http://iiif.io/api/auth/1/logout'
    );
    logoutService.label = 'Logout from Example Institution';

    authService.label = 'Terms of Use for Example Institution';
    authService.header = 'Restricted Material with Terms of Use';
    authService.description = '<span>... terms of use ... </span>.';
    authService.confirmLabel = 'I Agree';
    authService.failureHeader = 'Terms of Use Not Accepted';
    authService.failureDescription = 'You must accept the terms of use to see the content.';
    authService.service = []
    authService.service = [tokenService, logoutService];

    return authService;
}

export default router.routes();
