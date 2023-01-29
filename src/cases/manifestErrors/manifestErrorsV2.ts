import Router from 'koa-router';
import getBaseUrl from "../../lib/BaseUrl";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/missingManifest', ctx => {
    ctx.status = 404;
    ctx.body = 'Missing';
});


router.get('/collection/noJson', ctx => {
    ctx.body = 'No json';
});

router.get('/collection/noId', ctx => {
    ctx.body = {
        '@type': 'sc:Collection',
        label: 'Collection without id',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});


router.get('/collection/noLabel', ctx => {
    ctx.body = {
        '@id': getBaseUrl(ctx) + ctx.request.url,
        '@type': 'sc:Collection',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});


router.get('/collection/wrongManifestType', ctx => {
    ctx.body = {
        '@id': getBaseUrl(ctx) + ctx.request.url,
        '@type': 'sc:Abc',
        label: 'Collection with wrong manifest type',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});


router.get('/collection/missingSubfolder', ctx => {
    ctx.body = {
        '@id': getBaseUrl(ctx) + ctx.request.url,
        '@type': 'sc:Collection',
        label: 'Missing subfolder test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': getBaseUrl(ctx) + '/collection/missingSubfolder2',
                '@type': 'sc:Collection',
                label: 'Missing subfolder',
            }
        ]
    };
});


router.get('/collection/missingParent', ctx => {
    ctx.body = {
        '@id':getBaseUrl(ctx) + ctx.request.url,
        '@type': 'sc:Collection',
        label: 'Missing parent test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: getBaseUrl(ctx) + '/collection/missingParent2',
    };
});

router.get('/collection/loop', ctx => {
    ctx.body = {
        '@id': getBaseUrl(ctx) + ctx.request.url,
        '@type': 'sc:Collection',
        label: 'Loop test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: getBaseUrl(ctx) + '/collection/loop',
        collections: [
            {
                '@id': getBaseUrl(ctx) + '/collection/loop',
                '@type': 'sc:Collection',
                label: 'Loop subfolder',
            }
        ]
    };
});


router.get('/collection/missingInfoJson', ctx => {

    ctx.body = {
        '@id': getBaseUrl(ctx) + ctx.request.url,
        '@type': 'sc:Collection',
        label: 'Missing info.json test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': getBaseUrl(ctx) + '/manifest/missingInfoJson',
                '@type': 'sc:Manifest',
                label: 'missing.jpg',
                thumbnail: {
                    '@id': getBaseUrl(ctx) + '/image/missing/full/!100,100/0/default.jpg',
                    '@type': "dctypes:Image",
                    format: "image/jpeg",
                    service: {
                        '@id': getBaseUrl(ctx) + '/image/missing',
                        protocol: "http://iiif.io/api/image",
                        width: 100,
                        height: 100,
                        sizes: [],
                        profile: "http://iiif.io/api/image/2/level2.json"
                    }
                }
            },
        ]
    };
});

router.get('/manifest/missingInfoJson', ctx => {

    const imageWith = 1840;
    const imageHeight = 1450;

    ctx.body = {
        '@id': getBaseUrl(ctx) + ctx.request.url,
        '@type': 'sc:Manifest',
        label: 'missing.jpg',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: getBaseUrl(ctx) + '/collection/missingInfoJson',
        thumbnail: {
            '@id': getBaseUrl(ctx) + '/image/missing/full/!100,100/0/default.jpg',
            '@type': "dctypes:Image",
            format: "image/jpeg",
            service: {
                '@id': getBaseUrl(ctx) + '/image/missing',
                protocol: "http://iiif.io/api/image",
                width: imageWith,
                height: imageHeight,
                sizes: [],
                profile: "http://iiif.io/api/image/2/level2.json"
            }
        },
        sequences: [{
            '@id': getBaseUrl(ctx) + '/sequence/missingInfoJson',
            '@type': 'sc:Sequence',
            canvases: [{
                '@id': getBaseUrl(ctx) + '/canvas/missingInfoJson',
                '@type': 'sc:Canvas',
                width: imageWith,
                height: imageHeight,
                images: [{
                    '@id': getBaseUrl(ctx) + '/annotation/missingInfoJson/',
                    '@type': 'oa:Annotation',
                    motivation: 'sc:painting',
                    resource: {
                        '@id': getBaseUrl(ctx) + '/image/missing/full/full/0/default.jpg',
                        '@type': 'dctypes:Image',
                        format: 'image/jpeg',
                        width: imageWith,
                        height: imageHeight,
                        service: {
                            '@id': getBaseUrl(ctx) + '/image/missing',
                            protocol: 'http://iiif.io/api/image',
                            width: imageWith,
                            height: imageHeight,
                            sizes: [],
                            profile: 'http://iiif.io/api/image/2/level2.json'
                        }
                    },
                    "on": getBaseUrl(ctx) + '/canvas/missing'
                }]
            }]
        }]
    }
});

export default router.routes();
