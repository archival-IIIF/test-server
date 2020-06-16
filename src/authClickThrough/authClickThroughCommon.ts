import {ParameterizedContext} from "koa";
import AuthService from "../presentation-builder/v3/AuthService";
import RootCollection from "../lib/RootCollection";
import {hasAccess} from "../lib/Security";
import {getArielBase} from "../imageService/imageBase";

export const cookieName = 'access-click-through';
export const cookieToken = 'click-through-cookie-abc';
export const viewerToken = 'click-through-viewer-123';

export function getAuthClickThrough(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authClickThrough';
    const c = new RootCollection(url, 'Collection with access restriction');

    c.setService(getAuthClickThroughService(ctx));
    c.setItems([
        getAuthClickThroughImage(ctx, prefix),
    ]);

    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        ctx.status = 401;
    }

    return c;
}

export function getAuthClickThroughImage(ctx: ParameterizedContext, prefix: string) {

    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        ctx.status = 401;
    }

    return getArielBase(
        ctx,
        prefix,
        '/manifest/authClickThroughImage',
        '/collection/authClickThrough',
        getAuthClickThroughService(ctx)
    );
}

export function getAuthClickThroughService(ctx: ParameterizedContext) {
    const authService = new AuthService(
        ctx.request.origin + '/login/clickThrough',
        undefined,
        'http://iiif.io/api/auth/1/clickthrough'
    );
    const tokenService = new AuthService(
        ctx.request.origin + '/token/clickThrough',
        undefined,
        'http://iiif.io/api/auth/1/token'
    );
    const logoutService = new AuthService(
        ctx.request.origin + '/logout/clickThrough',
        undefined,
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
