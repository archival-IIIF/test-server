import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import AuthService from "../presentation-builder/v3/AuthService";
import RootCollection from "../lib/RootCollection";

export function getAuthLogin(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLogin';
    const c = new RootCollection(url, 'Collection with access restriction');
    c.setItems([
        getAuthLoginSubFolder(ctx, prefix),
    ]);
    c.setService(getAuthLoginService(ctx));

    return c;
}

export function getAuthLoginSubFolder(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLoginSubfolder';
    const c = new RootCollection(url, 'Subfolder with access restriction');
    c.setService(getAuthLoginService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authLogin', 'Collection');

    return c;
}

export function getAuthLoginService(ctx: ParameterizedContext) {
    const authService = new AuthService(
        ctx.request.origin + '/login',
        undefined,
        'http://iiif.io/api/auth/1/login'
    );
    const tokenService = new AuthService(
        ctx.request.origin + '/token',
        undefined,
        'http://iiif.io/api/auth/1/token'
    );
    const logoutService = new AuthService(
        ctx.request.origin + '/logout',
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
