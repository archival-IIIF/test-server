import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import CollectionItem from "../lib/CollectionItem";
import AuthService from "../presentation-builder/v3/AuthService";

export function getAuthLogin(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLogin';
    const c = new Collection(url, 'Collection with access restriction');
    c.setItems([
        new CollectionItem(getAuthLoginSubFolder(ctx, prefix)),
    ]);
    c.setService(getAuthService(ctx));

    return c;
}

export function getAuthLoginSubFolder(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLoginSubfolder';
    const c = new Collection(url, 'Subfolder with access restriction');
    c.setService(getAuthService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authLogin', 'Collection');

    return c;
}

function getAuthService(ctx: ParameterizedContext) {
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
