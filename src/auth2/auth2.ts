import * as Router from 'koa-router';

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});
import {hasAccess} from '../lib/Security';

router.get('/collection/auth2', ctx => {

    let collectionManifest = {
        '@id': ctx.request.origin + ctx.request.url,
        '@type': 'sc:Collection',
        label: 'Collection with access restriction',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + prefix + '/collection/auth21',
                '@type': 'sc:Collection',
                label: 'Subfolder with access restriction',
            }
        ],
        service: [
            {
                '@context': 'http://iiif.io/api/auth/1/context.json',
                '@id': ctx.request.origin + '/login',
                profile: 'http://iiif.io/api/auth/1/login',
                label: 'Login to Example Institution',
                header: 'Please Log In',
                description: 'Example Institution requires that you log in with your example account to view this content.',
                confirmLabel: 'Login',
                failureHeader: 'Authentication Failed',
                failureDescription: 'The code provided is not valid!',
                service: [
                    {
                        '@id': ctx.request.origin + '/token',
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
    };

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        collectionManifest.label = 'Access denied';
        collectionManifest.collections = [];
    }

    ctx.body = collectionManifest;
});

router.get('/collection/auth21', ctx => {

    let collectionManifest = {
        '@id': ctx.request.origin + ctx.request.url,
        '@type': 'sc:Collection',
        label: 'Subfolder with access restriction',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + prefix + '/collection/auth2',
        service: [
            {
                '@context': 'http://iiif.io/api/auth/1/context.json',
                '@id': ctx.request.origin + '/login',
                profile: 'http://iiif.io/api/auth/1/login',
                label: 'Login to Example Institution',
                header: 'Please Log In',
                description: 'Example Institution requires that you log in with your example account to view this content.',
                confirmLabel: 'Login',
                failureHeader: 'Authentication Failed',
                failureDescription: 'The code provided is not valid!',
                service: [
                    {
                        '@id': ctx.request.origin + '/token',
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
    };

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        collectionManifest.label = 'Access denied';
        ctx.body = collectionManifest;
        return;
    }

    ctx.body = collectionManifest;
});

export default router.routes();
