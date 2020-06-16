import * as Router from 'koa-router';
import {hasAccess} from '../lib/Security';
import RootCollection from "../lib/RootCollection";
import AuthService from "../presentation-builder/v3/AuthService";
import {addArialRoute, getArielManifestChild} from "../imageService/imageBase";

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
    {id: 'authExternalAccept', accespt: true, authServiceFunc: getAuthServiceAccept},
    {id: 'authExternalDeny', accespt: false, authServiceFunc: getAuthServiceDeny},
];
for (const testCase of testCases) {
    for (const prefix of prefixes) {
        router.get(prefix + '/collection/' + testCase.id, ctx => {
            if (!hasAccess(ctx, undefined, undefined, viewerToken)) {
                ctx.status = 401;
            }

            ctx.body = collection(ctx, testCase.accespt, testCase.id, prefix);
        });

        addArialRoute(
            router,
            testCase.id,
            '/collection/' + testCase.id,
            testCase.authServiceFunc,
            undefined,
            undefined,
            viewerToken
        );
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

function collection(ctx: any, accept: boolean, idPath: string, prefix: string) {
    const id = ctx.request.origin + prefix +  '/collection/' + idPath;
    const c = new RootCollection(id, 'Collection with access restriction');
    c.setItems(getArielManifestChild(ctx, prefix, idPath));
    c.setService(getAuthService(ctx, accept));

    return c;
}
function getAuthServiceAccept(ctx: any): AuthService {
    return getAuthService(ctx, true);
}

function getAuthServiceDeny(ctx: any): AuthService {
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

export default router.routes();
