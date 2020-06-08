import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
const imageWith = 1840;
const imageHeight = 1450;


router.get('/collection/image', ctx => {

    let arielPresentation = getArielPresentation(ctx);
    arielPresentation.partOf = undefined;
    arielPresentation.thumbnail = undefined;

    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Image test case']},
        '@context': "http://iiif.io/api/presentation/3/context.json",
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        items: [
            {
                id: ctx.request.origin + prefix + '/manifest/ariel',
                type: 'Manifest',
                label: {en: ['Ariel_-_LoC_4a15521.jpg']},
                thumbnail: [{
                    id: ctx.request.origin + '/image-service/v3/ariel/full/!100,100/0/default.jpg',
                    type: "Image",
                    format: "image/jpeg",
                    service: [{
                        id: ctx.request.origin + '/image-service/v3/ariel',
                        type: "ImageService3",
                        width: imageWith,
                        height: imageHeight,
                        profile: "level2"
                    }]
                }]
            },
        ]
    };
});

router.get('/manifest/ariel', ctx => {
    ctx.body = getArielPresentation(ctx);
});

function getArielPresentation(ctx: Router.RouterContext) {
    return {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {en: ['Ariel_-_LoC_4a15521.jpg']},
        "@context": [
            "http://www.w3.org/ns/anno.jsonld",
            "http://iiif.io/api/presentation/3/context.json"
        ],
        partOf: [{id: ctx.request.origin + prefix + '/collection/image', type: 'Collection'}],
        thumbnail: [{
            id: ctx.request.origin + '/image-service/v3/ariel/full/!100,100/0/default.jpg',
            type: "Image",
            format: "image/jpeg",
            service: [{
                id: ctx.request.origin + '/image-service/v3/ariel',
                protocol: "http://iiif.io/api/image",
                width: imageWith,
                height: imageHeight,
                type: "ImageService3",
                profile: "level2"
            }]
        }],
        metadata: [
            {
                label: {en: ["Original file type"]},
                value: {none: ["<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=729\">Windows Bitmap (.bmp, .dib)</a>"]}
            },
            {
                label: {en: ["Original file size"]},
                value: {none: ["1.28 MB"]}
            },
            {
                label: {en: ["Original modification date"]},
                value: {none: ["March 1st 2012"]}
            }
        ],
        items: [
            {
                id: ctx.request.origin + prefix + '/canvas/ariel',
                type: "Canvas",
                width: imageWith,
                height: imageHeight,
                items: [
                    {
                        id: ctx.request.origin + prefix + '/annotationPage/ariel',
                        type: "AnnotationPage",
                        items: [
                            {
                                id: ctx.request.origin + prefix + '/annotation/ariel',
                                type: "Annotation",
                                motivation: "painting",
                                body: {
                                    id:  ctx.request.origin + '/image-service/v3/ariel/full/!100,100/0/default.jpg',
                                    type: "Image",
                                    format: "image/jpg",
                                    height: imageHeight,
                                    width: imageWith,
                                    service: [{
                                        id: ctx.request.origin + '/image-service/v3/ariel',
                                        type: "ImageService3",
                                        profile: "level2",
                                        height: imageHeight,
                                        width: imageWith
                                    }],
                                },
                                target: ctx.request.origin + prefix + '/canvas/ariel'
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

export default router.routes();