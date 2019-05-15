import * as Router from 'koa-router';

const {hasAccess} = require('../lib/Security');

const router: Router = new Router();

const serveImage = require('../image/internal');
const imageWith = 1840;
const imageHeight = 1450;


router.get('/collection/auth4', ctx => {

    let collectionManifest = {
        '@id': ctx.request.origin + '/collection/auth4',
        '@type': 'sc:Collection',
        label: 'Open Collection with a locked info-json',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/auth41',
                '@type': 'sc:Manifest',
                label: 'test.png',
                thumbnail: {
                    '@id': ctx.request.origin + '/image/auth41/full/!100,100/0/default.jpg',
                    '@type': 'dctypes:Image',
                    format: 'image/jpeg',
                    service: {
                        '@id': ctx.request.origin + '/image/auth41',
                        protocol: 'http://iiif.io/api/image',
                        width: imageWith,
                        height: imageHeight,
                        profile: 'http://iiif.io/api/image/2/level2.json'
                    }
                },
            }
        ]
    };

    ctx.body = collectionManifest;
});

router.get('/manifest/auth41', ctx => {

    ctx.body = {
        '@id': ctx.request.origin + '/manifest/auth41',
        '@type': 'sc:Manifest',
        label: 'test.png',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/auth4',
        thumbnail: {
            '@id': ctx.request.origin + '/image/auth41/full/!100,100/0/default.jpg',
            '@type': 'dctypes:Image',
            format: 'image/jpeg',
            service: {
                '@id': ctx.request.origin + '/image/auth41',
                protocol: 'http://iiif.io/api/image',
                width: imageWith,
                height: imageHeight,
                sizes: [],
                profile: 'http://iiif.io/api/image/2/level2.json'
            }
        },
        sequences: [{
            '@id': ctx.request.origin + '/sequence/auth41',
            '@type': 'sc:Sequence',
            canvases: [{
                '@id': ctx.request.origin + '/canvas/auth41',
                '@type': 'sc:Canvas',
                width: imageWith,
                height: imageHeight,
                images: [{
                    '@id': ctx.request.origin + '/annotation/auth41',
                    '@type': 'oa:Annotation',
                    motivation: 'sc:painting',
                    resource: {
                        '@id': ctx.request.origin + '/image/auth41/full/full/0/default.jpg',
                        '@type': 'dctypes:Image',
                        format: 'image/jpeg',
                        width: imageWith,
                        height: imageHeight,
                        service: {
                            '@id': ctx.request.origin + '/image/auth41',
                            protocol: 'http://iiif.io/api/image',
                            width: imageWith,
                            height: imageHeight,
                            sizes: [],
                            profile: 'http://iiif.io/api/image/2/level2.json'
                        }
                    },
                    on: ctx.request.origin + '/canvas/auth41'
                }]
            }]
        }]
    };
});


router.get('/image/auth41/info.json', ctx => {
    if (!hasAccess(ctx)) {
        ctx.status = 401;
    }

    ctx.body = {
        '@id': ctx.request.origin + '/image/auth41',
        protocol: 'http://iiif.io/api/image',
        width: imageWith,
        height: imageHeight,
        sizes: [],
        '@context': 'http://iiif.io/api/image/2/context.json',
        profile: [
            'http://iiif.io/api/image/2/level2.json',
            {
                supports: ['canonicalLinkHeader', 'profileLinkHeader', 'mirroring', 'rotationArbitrary', 'regionSquare'],
                qualities: ['default', 'color', 'gray', 'bitonal'],
                formats: ['jpg', 'png', 'gif', 'webp']
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
});


router.get('/image/auth41/:region/:size/:rotation/:quality.:format', async ctx => {

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        return;
    }

    const item = {
        uri: __dirname + '/../image/Ariel_-_LoC_4a15521.jpg',
        width: imageWith,
        height: imageHeight
    };

    let result = await serveImage(item, {
        region: ctx.params.region,
        size: ctx.params.size,
        rotation: ctx.params.rotation,
        quality: ctx.params.quality,
        format: ctx.params.format
    });

    ctx.body = result.image;
    ctx.status = result.status;
    ctx.set('Content-Type', result.contentType);
    ctx.set('Content-Length', result.contentLength);
});


export default router.routes();

