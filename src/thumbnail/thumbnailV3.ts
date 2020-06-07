import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/thumbnail', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Thumbnail test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        items: [
            {
                id: ctx.request.origin + prefix + '/collection/folderWithThumbnail',
                type: 'Collection',
                label: {en: ['Folder with thumbnail']},
                thumbnail: [{
                    id: ctx.request.origin + '/file-icon/folder.svg',
                    type: 'Image',
                    format: 'image/svg+xml'
                }]
            },
            {
                id: ctx.request.origin + prefix + '/collection/folderWithoutThumbnail',
                type: 'Collection',
                label: {en: ['Folder without thumbnail']},
            },
            {
                id: ctx.request.origin + prefix + '/collection/folderWithThumbnailService',
                type: 'Collection',
                label: {en: ['Folder with thumbnail service']},
                thumbnail: [{
                    id: ctx.request.origin + '/image-service/v3/ariel/full/!100,100/0/default.jpg',
                    type: 'Image',
                    format: 'image/jpeg',
                    service: [{
                        id: ctx.request.origin + '/image-service/v3/ariel',
                        protocol: "http://iiif.io/api/image",
                        width: 3507,
                        height: 2480,
                        type: "ImageService3",
                        profile: "level2"
                    }]
                }]
            },
            {
                id: ctx.request.origin + prefix + '/manifest/fileWithoutThumbnail',
                type: 'Manifest',
                label: {en: ['File without thumbnail']},
            },
        ]
    };
});

router.get('/collection/folderWithThumbnail', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Folder with thumbnail']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/thumbnail', type: 'Collection'}],
        thumbnail: [{
            id: ctx.request.origin + '/file-icon/folder.svg',
            type: 'Image',
            format: 'image/svg+xml'
        }]
    };
});

router.get('/collection/folderWithoutThumbnail', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Folder without thumbnail']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/thumbnail', type: 'Collection'}],
    };
});

router.get('/collection/folderWithThumbnailService', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Folder with image service thumbnail']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/thumbnail', type: 'Collection'}],
        thumbnail: [{
            id: ctx.request.origin + '/image-service/v3/ariel/full/!100,100/0/default.jpg',
            format: 'image/jpeg',
            type: 'Image',
            service: [{
                id: ctx.request.origin + '/image-service/v3/ariel',
                protocol: "http://iiif.io/api/image",
                width: 3507,
                height: 2480,
                type: "ImageService3",
                profile: "level2"
            }]
        }]
    };
});


router.get('/manifest/fileWithoutThumbnail', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {en: ['File without thumbnail']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/thumbnail', type: 'Collection'}],
    };
});


export default router.routes();

