import * as Router from 'koa-router';
import {hasAccess} from '../lib/Security';

const router: Router = new Router();


router.get('/collection/auth3', ctx => {

    let collectionManifest = {
        '@id': ctx.request.origin + '/collection/auth3',
        '@type': 'sc:Collection',
        label: 'Open Collection',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/auth31',
                '@type': 'sc:Collection',
                label: 'Subfolder with access restriction',
            },
        ],
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/auth32',
                '@type': 'sc:Manifest',
                label: 'File with access restriction',
            }
        ]
    };

    if (!hasAccess(ctx)) {
        collectionManifest.collections[0].label = 'Access denied';
        collectionManifest.manifests[0].label = 'Access denied';
    }

    ctx.body = collectionManifest;
});

router.get('/collection/auth31', ctx => {

    let collectionManifest = {
        '@id': ctx.request.origin + '/collection/auth31',
        '@type': 'sc:Collection',
        label: 'Subfolder with access restriction',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/auth3',
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
    }

    ctx.body = collectionManifest;
});

router.get('/manifest/auth32', ctx => {

    let collectionManifest = {
        '@id': ctx.request.origin + '/manifest/auth32',
        '@type': 'sc:Manifest',
        label: 'File with access restriction',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/auth3',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
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
        collectionManifest.license = undefined;
    }

    ctx.body = collectionManifest;
});

export default router.routes();

