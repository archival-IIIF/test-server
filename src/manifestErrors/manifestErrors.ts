import * as Router from 'koa-router';

const router: Router = new Router();

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
        '@id': ctx.request.origin + '/collection/noLabel',
        '@type': 'sc:Collection',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});

router.get('/collection/missingSubfolder', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/missingSubfolder',
        '@type': 'sc:Collection',
        label: 'Missing subfolder test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/missingSubfolder2',
                '@type': 'sc:Collection',
                label: 'Missing subfolder',
            }
        ]
    };
});

router.get('/collection/missingParent', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/missingParent',
        '@type': 'sc:Collection',
        label: 'Missing parent test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/missingParent2',
    };
});

router.get('/collection/loop', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/loop',
        '@type': 'sc:Collection',
        label: 'Loop test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/loop',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/loop',
                '@type': 'sc:Collection',
                label: 'Loop subfolder',
            }
        ]
    };
});



router.get('/collection/missingInfoJson', ctx => {

    ctx.body = {
        '@id': ctx.request.origin + '/collection/missingInfoJson',
        '@type': 'sc:Collection',
        label: 'Missing info.json test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/missingInfoJson',
                '@type': 'sc:Manifest',
                label: 'missing.jpg',
                thumbnail: {
                    '@id': ctx.request.origin + '/image/missing/full/!100,100/0/default.jpg',
                    '@type': "dctypes:Image",
                    format: "image/jpeg",
                    service: {
                        '@id': ctx.request.origin + '/image/missing',
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
        '@id': ctx.request.origin + '/manifest/missingInfoJson',
        '@type': 'sc:Manifest',
        label: 'missing.jpg',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/missingInfoJson',
        thumbnail: {
            '@id': ctx.request.origin + '/image/missing/full/!100,100/0/default.jpg',
            '@type': "dctypes:Image",
            format: "image/jpeg",
            service: {
                '@id': ctx.request.origin + '/image/missing',
                protocol: "http://iiif.io/api/image",
                width: imageWith,
                height: imageHeight,
                sizes: [],
                profile: "http://iiif.io/api/image/2/level2.json"
            }
        },
        sequences: [{
            '@id': ctx.request.origin + '/sequence/missingInfoJson',
            '@type': 'sc:Sequence',
            canvases: [{
                '@id': ctx.request.origin + '/canvas/missingInfoJson',
                '@type': 'sc:Canvas',
                width: imageWith,
                height: imageHeight,
                images: [{
                    '@id': ctx.request.origin + '/annotation/missingInfoJson/',
                    '@type': 'oa:Annotation',
                    motivation: 'sc:painting',
                    resource: {
                        '@id': ctx.request.origin + '/image/missing/full/full/0/default.jpg',
                        '@type': 'dctypes:Image',
                        format: 'image/jpeg',
                        width: imageWith,
                        height: imageHeight,
                        service: {
                            '@id': ctx.request.origin + '/image/missing',
                            protocol: 'http://iiif.io/api/image',
                            width: imageWith,
                            height: imageHeight,
                            sizes: [],
                            profile: 'http://iiif.io/api/image/2/level2.json'
                        }
                    },
                    "on": ctx.request.origin + '/canvas/missing'
                }]
            }]
        }]
    }
});

export default router.routes();
