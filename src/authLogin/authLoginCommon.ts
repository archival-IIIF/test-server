import {ParameterizedContext} from "koa";
import AuthService from "../presentation-builder/v3/AuthService";

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
