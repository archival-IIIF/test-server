import Router from 'koa-router';
import getBaseUrl from "../../lib/BaseUrl";

const prefix = '/iiif/v3';
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
        type: 'Collection',
        label: {en: ['Collection without id']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
    };
});


router.get('/collection/noLabel', ctx => {
    ctx.body = {
        id: getBaseUrl(ctx) + ctx.request.url,
        type: 'Collection',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
    };
});


router.get('/collection/wrongManifestType', ctx => {
    ctx.body = {
        id: getBaseUrl(ctx) + ctx.request.url,
        type: 'Abc',
        label: {en: ['Collection with wrong manifest type']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
    };
});


router.get('/collection/missingSubfolder', ctx => {
    ctx.body = {
        id: getBaseUrl(ctx) + ctx.request.url,
        type: 'Collection',
        label: {en: ['Missing subfolder test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        items: [
            {
                id: getBaseUrl(ctx) + prefix + '/collection/missingSubfolder2',
                type: 'Collection',
                label: {en: ['Missing subfolder']},
            }
        ]
    };
});


router.get('/collection/missingParent', ctx => {
    ctx.body = {
        id:getBaseUrl(ctx) + ctx.request.url,
        type: 'Collection',
        label: {en: ['Missing parent test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: getBaseUrl(ctx) + prefix + '/collection/missingParent2', type: 'Collection'}],
    };
});

router.get('/collection/loop', ctx => {
    ctx.body = {
        id: getBaseUrl(ctx) + ctx.request.url,
        type: 'Collection',
        label: {en: ['Loop test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        parOf: getBaseUrl(ctx) + '/collection/loop',
        items: [
            {
                id: getBaseUrl(ctx) + prefix + '/collection/loop',
                type: 'Collection',
                label: {en: ['Loop subfolder']}
            }
        ]
    };
});


router.get('/collection/missingInfoJson', ctx => {

    ctx.body = {
        id: getBaseUrl(ctx) + ctx.request.url,
        type: 'Collection',
        label: {en: ['Missing info.json test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        items: [
            {
                id: getBaseUrl(ctx) + prefix + '/manifest/missingInfoJson',
                type: 'Manifest',
                label: {en: ['missing.jpg']},
                thumbnail: [{
                    id: getBaseUrl(ctx) + '/image/missing/full/!100,100/0/default.jpg',
                    type: "Image",
                    format: "image/jpeg",
                    service: [{
                        id: getBaseUrl(ctx) + prefix +'/image/missing',
                        protocol: "http://iiif.io/api/image",
                        width: 100,
                        height: 100,
                        type: 'ImageService3',
                        profile: "level2"
                    }]
                }]
            },
        ]
    };
});

router.get('/manifest/missingInfoJson', ctx => {

    const imageWith = 1840;
    const imageHeight = 1450;

    ctx.body = {
        id: getBaseUrl(ctx) + ctx.request.url,
        type: 'Manifest',
        label: {en: ['missing.jpg']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: getBaseUrl(ctx) + prefix + '/collection/missingInfoJson', type: 'Collection'}],
        thumbnail: [{
            id: getBaseUrl(ctx) + '/image/missing/full/!100,100/0/default.jpg',
            type: "Image",
            format: "image/jpeg",
            service: [{
                id: getBaseUrl(ctx) + '/image/missing',
                protocol: "http://iiif.io/api/image",
                width: imageWith,
                height: imageHeight,
                type: 'ImageService3',
                profile: "level2"
            }]
        }],
        items: [{
            id: getBaseUrl(ctx) + prefix + '/canvas/missingInfoJson',
            type: "Canvas",
            width: imageWith,
            height: imageHeight,
            items: [{
                id: getBaseUrl(ctx) + prefix + '/annotationPage/missingInfoJson',
                type: 'AnnotationPage',
                items: [{
                    id: getBaseUrl(ctx) + '/annotation/missingInfoJson/',
                    type: 'Annotation',
                    motivation: 'painting',
                    body: {
                        id: getBaseUrl(ctx) + '/image/missing/full/full/0/default.jpg',
                        type: 'Image',
                        format: 'image/jpeg',
                        width: imageWith,
                        height: imageHeight,
                        service: [{
                            id: getBaseUrl(ctx) + '/image/missing',
                            protocol: 'http://iiif.io/api/image',
                            width: imageWith,
                            height: imageHeight,
                            sizes: [],
                            type: 'ImageService3',
                            profile: 'level2',
                        }]
                    },
                    target: getBaseUrl(ctx) + prefix + '/canvas/missingInfoJson'
                }]
            }]
        }]
    }
});

export default router.routes();
