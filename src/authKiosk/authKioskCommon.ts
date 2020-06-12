import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import AuthService from "../presentation-builder/v3/AuthService";
import RootCollection from "../lib/RootCollection";
import {hasAccess} from "../lib/Security";

export const cookieName = 'access-kiosk';
export const cookieToken = 'kiosk-cookie-abc';
export const viewerToken = 'kiosk-viewer-123';

export function getAuthKiosk(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authKiosk';
    const c = new RootCollection(url, 'Collection with access restriction');

    c.setService(getAuthKioskService(ctx));

    if (hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        c.setItems([
            //getAuthKioskSubFolder(ctx, prefix),
        ]);
    } else{
        ctx.status = 401;
        c.setLabel('Access denied');
    }

    return c;
}

export function getAuthKioskSubFolder(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authKioskSubfolder';
    const c = new RootCollection(url, 'Subfolder with access restriction');
    c.setService(getAuthKioskService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authKiosk', 'Collection');

    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        ctx.status = 401;
        c.setLabel( 'Access denied');
    }

    return c;
}

export function getAuthKioskService(ctx: ParameterizedContext) {
    const authService = new AuthService(
        ctx.request.origin + '/login/kiosk',
        undefined,
        'http://iiif.io/api/auth/1/kiosk'
    );
    const tokenService = new AuthService(
        ctx.request.origin + '/token/kiosk',
        undefined,
        'http://iiif.io/api/auth/1/token'
    );
    const logoutService = new AuthService(
        ctx.request.origin + '/logout/kiosk',
        undefined,
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
