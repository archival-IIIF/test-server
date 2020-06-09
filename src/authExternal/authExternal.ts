import * as Router from 'koa-router';
import {hasAccess, ViewerToken} from '../lib/Security';

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

interface IMessage {
    accessToken?: string;
    expiresIn?: number;
    error?: string;
    description?: string;
    messageId?: string;
}

router.get('/collection/authExternalAccept', ctx => {

    const id = ctx.request.origin + prefix + '/collection/authExternalAccept';
    const subId = ctx.request.origin + prefix + '/collection/authExternalAcceptSub';

    ctx = collection(ctx, true, id, subId);
});

router.get('/collection/authExternalAcceptSub', ctx => {

    const id = ctx.request.origin + prefix + '/collection/authExternalAccept';
    const subId = ctx.request.origin + prefix + '/collection/authExternalAcceptSub';

    ctx = subCollection(ctx, true, id, subId);
});

router.get('/collection/authExternalDeny', ctx => {

    const id = ctx.request.origin + prefix + '/collection/authExternalDeny';
    const subId = ctx.request.origin + prefix + '/collection/authExternalDenySub';

    ctx = collection(ctx, false, id, subId);
});

router.get('/collection/authExternalDenySub', ctx => {

    const id = ctx.request.origin + prefix + '/collection/authExternalDeny';
    const subId = ctx.request.origin + prefix + '/collection/authExternalDenySub';

    ctx = subCollection(ctx, false, id, subId);
});


router.get('/auth/external/accept/token', async (ctx: Router.RouterContext) => {
    const message: IMessage = {};
    message.accessToken = ViewerToken;
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

function collection(ctx: any, accept: boolean, id: string, subId: string) {

    let collectionManifest = {
        '@id': id,
        '@type': 'sc:Collection',
        label: 'Collection with access restriction',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': subId,
                '@type': 'sc:Collection',
                label: 'Subfolder with access restriction',
            }
        ],
        service: getAuthService(ctx, accept)
    };

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        collectionManifest.label = 'Access denied';
        collectionManifest.collections = [];
    }

    ctx.body = collectionManifest;

    return ctx;
}

function subCollection(ctx: any, accept: boolean, id: string, subId: string) {
    let collectionManifest = {
        '@id': subId,
        '@type': 'sc:Collection',
        label: 'Subfolder with access restriction',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: id,
        service: getAuthService(ctx, accept)
    };

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        collectionManifest.label = 'Access denied';
        ctx.body = collectionManifest;
        return;
    }

    ctx.body = collectionManifest;

    return ctx;
}

function getAuthService(ctx: any, accept: boolean) {

    let tokenUrl;
    if (accept) {
        tokenUrl = ctx.request.origin + '/auth/external/accept/token';
    } else {
        tokenUrl = ctx.request.origin + '/auth/external/deny/token';
    }

    return [
        {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': ctx.request.origin + '/external',
            profile: 'http://iiif.io/api/auth/1/external',
            label: 'External Authentication Required',
            failureHeader: 'Restricted Material',
            failureDescription: 'This material is not viewable without prior agreement!',
            service: [
                {
                    '@id': tokenUrl,
                    'profile': 'http://iiif.io/api/auth/1/token'
                },
                {
                    '@id': ctx.request.origin + '/logout',
                    profile: 'http://iiif.io/api/auth/1/logout',
                    label: 'Logout from Example Institution'
                }
            ]
        }
    ]
}

export default router.routes();
