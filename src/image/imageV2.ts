import * as Router from 'koa-router';

const router: Router = new Router();
const imageWith = 1840;
const imageHeight = 1450;


router.get('/collection/image', ctx => {

    let arielPresentation = getArielPresentation(ctx);
    arielPresentation.within = undefined;
    arielPresentation.thumbnail = undefined;

    ctx.body = {
        '@id': ctx.request.origin + '/collection/image',
        '@type': 'sc:Collection',
        label: 'Image test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/ariel',
                '@type': 'sc:Manifest',
                label: 'Ariel_-_LoC_4a15521.jpg',
                thumbnail: {
                    '@id': ctx.request.origin + '/image/ariel/full/!100,100/0/default.jpg',
                    '@type': "dctypes:Image",
                    format: "image/jpeg",
                    service: {
                        '@id': ctx.request.origin + '/image/ariel',
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
        '@id': ctx.request.origin + '/manifest/ariel',
        '@type': 'sc:Manifest',
        label: 'Ariel_-_LoC_4a15521.jpg',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/image',
        thumbnail: {
            '@id': ctx.request.origin + '/image/ariel/full/!100,100/0/default.jpg',
            '@type': "dctypes:Image",
            format: "image/jpeg",
            service: {
                '@id': ctx.request.origin + '/image/ariel',
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
            '@id': ctx.request.origin + '/sequence/ariel',
            '@type': 'sc:Sequence',
            canvases: [{
                '@id': ctx.request.origin + '/canvas/ariel',
                '@type': 'sc:Canvas',
                width: imageWith,
                height: imageHeight,
                images: [{
                    '@id': ctx.request.origin + '/annotation/ariel/',
                    '@type': 'oa:Annotation',
                    motivation: 'sc:painting',
                    resource: {
                        '@id': ctx.request.origin + '/image/ariel/full/full/0/default.jpg',
                        '@type': 'dctypes:Image',
                        format: 'image/jpeg',
                        width: imageWith,
                        height: imageHeight,
                        service: {
                            '@id': ctx.request.origin + '/image/ariel',
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

export default router.routes();