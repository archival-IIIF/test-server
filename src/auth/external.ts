import AuthService from "../presentation-builder/v3/AuthService";
import * as Router from "koa-router";
import * as moment from "moment";

export const cookieName = 'access-external';
export const cookieToken = 'external-cookie-abc';
export const viewerToken = 'external-viewer-123';

export function getAuthServiceAccept(ctx: any): AuthService {
    return getAuthService(ctx, true);
}

export function getAuthServiceDeny(ctx: any): AuthService {
    return getAuthService(ctx, false);
}


function getAuthService(ctx: any, accept: boolean): AuthService {

    let tokenUrl;
    if (accept) {
        tokenUrl = ctx.request.origin + '/auth/external/accept/token';
    } else {
        tokenUrl = ctx.request.origin + '/auth/external/deny/token';
    }

    const authService = new AuthService(
        ctx.request.origin + '/external',
        '',
        'http://iiif.io/api/auth/1/external'
    );
    authService.label = 'External Authentication Required';
    authService.failureHeader = 'Restricted Material';
    authService.failureDescription = 'This material is not viewable without prior agreement!';
    const tokenService = new AuthService(
        tokenUrl,
        undefined,
        'http://iiif.io/api/auth/1/token'
    );
    authService.service = [tokenService];


    return authService;
}

const router: Router = new Router();

interface IMessage {
    accessToken?: string;
    expiresIn?: number;
    error?: string;
    description?: string;
    messageId?: string;
}

router.get('/auth/external/accept/token', async (ctx: Router.RouterContext) => {
    const message: IMessage = {};
    message.accessToken = viewerToken;
    message.expiresIn = 3600;
    ctx.body = message;
});

router.get('/auth/external/deny/token', async (ctx: Router.RouterContext) => {

    const message: IMessage = {};
    message.error = 'missingCredentials';
    message.description = 'No access cookie found!';
    ctx.status = 401;
    ctx.body = message;
});

export default router.routes();
