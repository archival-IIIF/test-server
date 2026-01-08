import {AuthService} from "@archival-iiif/presentation-builder";
import Router from "@koa/router";
import getBaseUrl from "../lib/BaseUrl";
import {Context} from "koa";

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
        tokenUrl = getBaseUrl(ctx) + '/auth/external/accept/token';
    } else {
        tokenUrl = getBaseUrl(ctx) + '/auth/external/deny/token';
    }

    const authService = new AuthService(
        getBaseUrl(ctx) + '/external',
        '',
        'http://iiif.io/api/auth/1/external'
    );
    authService.label = 'External Authentication Required';
    authService.failureHeader = 'Restricted Material';
    authService.failureDescription = 'This material is not viewable without prior agreement!';
    const tokenService = new AuthService(
        tokenUrl,
        '',
        'http://iiif.io/api/auth/1/token'
    );
    authService.service = [tokenService];


    return authService;
}

const router = new Router();

interface IMessage {
    accessToken?: string;
    expiresIn?: number;
    error?: string;
    description?: string;
    messageId?: string;
}

router.get('/auth/external/accept/token', async (ctx: Context) => {
    const message: IMessage = {};
    message.accessToken = viewerToken;
    message.expiresIn = 3600;
    ctx.body = message;
});

router.get('/auth/external/deny/token', async (ctx: Context) => {

    const message: IMessage = {};
    message.error = 'missingCredentials';
    message.description = 'No access cookie found!';
    ctx.status = 401;
    ctx.body = message;
});

export default router.routes();
