import * as Router from 'koa-router';
import {hasAccess} from '../lib/Security';
import RootCollection from "../lib/RootCollection";
import AuthService from "../presentation-builder/v3/AuthService";

const router: Router = new Router();

interface IMessage {
    accessToken?: string;
    expiresIn?: number;
    error?: string;
    description?: string;
    messageId?: string;
}
export const viewerToken = 'external-viewer-123';
const prefixes = ['/iiif/v2', '/iiif/v3'];
const testCases = [
    {id: 'authExternalAccept', accespt: true},
    {id: 'authExternalDeny', accespt: false},
];
for (const prefix of prefixes) {
    for (const testCase of testCases) {
        router.get(prefix + '/collection/' + testCase.id, ctx => {
            if (!hasAccess(ctx, undefined, undefined, viewerToken)) {
                ctx.status = 401;
            }
            const id = ctx.request.origin + prefix +  '/collection/' + testCase.id;
            ctx.body = collection(ctx, testCase.accespt, id);
        });

        router.get(prefix + '/collection/' + testCase.id + 'Sub', ctx => {
            if (!hasAccess(ctx, undefined, undefined, viewerToken)) {
                ctx.status = 401;
            }
            const id = ctx.request.origin + prefix + '/collection/' + testCase.id;
            ctx.body = subCollection(ctx, testCase.accespt, id);
        });
    }
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

function collection(ctx: any, accept: boolean, id: string) {

    const c = new RootCollection(id, 'Collection with access restriction');
    c.setItems(subCollection(ctx, accept, id));
    c.setService(getAuthService(ctx, accept));

    if (!hasAccess(ctx, undefined, undefined, viewerToken)) {
        c.setLabel('Access denied');
        c.setItems([]);
    }

    return c;
}

function subCollection(ctx: any, accept: boolean, id: string) {

    const c = new RootCollection(id + 'Sub', 'Collection with access restriction');
    c.setService(getAuthService(ctx, accept));
    c.setParent(id, 'Collection');

    if (!hasAccess(ctx, undefined, undefined, viewerToken)) {
        c.setLabel('Access denied');
        c.setItems([]);
    }

    return c;
}

function getAuthService(ctx: any, accept: boolean) {

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
    const logoutService = new AuthService(
        ctx.request.origin + '/logout',
        undefined,
        'http://iiif.io/api/auth/1/logout'
    );
    authService.service = [tokenService, logoutService];


    return authService;
}

export default router.routes();
