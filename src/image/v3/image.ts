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
        label: 'Image test case',
        '@context': "http://iiif.io/api/presentation/3/context.json",
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        items: [
            {
                id: ctx.request.origin + prefix + '/manifest/ariel',
                type: 'Manifest',
                label: 'Ariel_-_LoC_4a15521.jpg',
                thumbnail: {
                    id: ctx.request.origin + '/image/ariel/full/!100,100/0/default.jpg',
                    type: "dctypes:Image",
                    format: "image/jpeg",
                    service: {
                        id: ctx.request.origin + '/image/ariel',
                        protocol: "http://iiif.io/api/image",
                        width: imageWith,
                        height: imageHeight,
                        sizes: [],
                        profile: "http://iiif.io/api/image/2/level2.json"
                    }
                }
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
        label: 'Ariel_-_LoC_4a15521.jpg',
        '@context': "http://iiif.io/api/presentation/3/context.json",
        partOf: ctx.request.origin + prefix + '/collection/image',
        thumbnail: {
            id: ctx.request.origin + '/image/ariel/full/!100,100/0/default.jpg',
            type: "dctypes:Image",
            format: "image/jpeg",
            service: {
                id: ctx.request.origin + '/image/ariel',
                protocol: "http://iiif.io/api/image",
                width: imageWith,
                height: imageHeight,
                profile: "http://iiif.io/api/image/2/level2.json"
            }
        },
        metadata: [
            {
                label: "Original file type",
                value: "<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=729\">Windows Bitmap (.bmp, .dib)</a>"
            },
            {
                label: "Original file size",
                value: "1.28 MB"
            },
            {
                label: "Original modification date",
                value: "March 1st 2012"
            }
        ],
        sequences: [{
            id: ctx.request.origin + '/sequence/ariel',
            type: 'sc:Sequence',
            canvases: [{
                id: ctx.request.origin + '/canvas/ariel',
                type: 'sc:Canvas',
                width: imageWith,
                height: imageHeight,
                images: [{
                    id: ctx.request.origin + '/annotation/ariel/',
                    type: 'oa:Annotation',
                    motivation: 'sc:painting',
                    resource: {
                        id: ctx.request.origin + '/image/ariel/full/full/0/default.jpg',
                        type: 'dctypes:Image',
                        format: 'image/jpeg',
                        width: imageWith,
                        height: imageHeight,
                        service: {
                            id: ctx.request.origin + '/image/ariel',
                            protocol: 'http://iiif.io/api/image',
                            width: imageWith,
                            height: imageHeight,
                            profile: 'http://iiif.io/api/image/2/level2.json'
                        }
                    },
                    "on": ctx.request.origin + '/canvas/ariel'
                }]
            }]
        }]
    };
}


router.get('/image/ariel/info.json', ctx => {
    ctx.body = {
        id: ctx.request.origin + '/image/ariel',
        type: "ImageService3",
        protocol: "http://iiif.io/api/image",
        width: imageWith,
        height: imageHeight,
        sizes: [],
        "@context": "http://iiif.io/api/image/3/context.json",
        "preferredFormats": [ "jpg"],
        "extraFormats": ["jpg", "png", "gif", "webp"],
        "extraFeatures": ["canonicalLinkHeader", "profileLinkHeader", "mirroring", "rotationArbitrary", "regionSquare"],
        "extraQualities": ["default", "color", "gray", "bitonal"]
    };
});

export default router.routes();
