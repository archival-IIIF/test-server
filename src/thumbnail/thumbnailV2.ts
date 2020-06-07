import * as Router from 'koa-router';

const router: Router = new Router();

router.get('/collection/thumbnail', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/thumbnail',
        '@type': 'sc:Collection',
        label: 'Thumbnail test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        collections: [
            {
                '@id': ctx.request.origin + '/collection/folderWithThumbnail',
                '@type': 'sc:Collection',
                label: 'Folder with thumbnail',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/folder.svg',
                    format: 'image/svg+xml'
                }
            },
            {
                '@id': ctx.request.origin + '/collection/folderWithoutThumbnail',
                '@type': 'sc:Collection',
                label: 'Folder without thumbnail',
            },
            {
                '@id': ctx.request.origin + '/collection/folderWithThumbnailService',
                '@type': 'sc:Collection',
                label: 'Folder with thumbnail service',
                thumbnail: {
                    '@id': ctx.request.origin + '/folderWithThumbnailService',
                    format: 'image/svg+xml',
                    service: {
                        '@id': ctx.request.origin + '/image/ariel',
                        protocol: "http://iiif.io/api/image",
                        width: 3507,
                        height: 2480,
                        sizes: [],
                        profile: "http://iiif.io/api/image/2/level2.json"
                    }
                }
            }
        ],
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/fileWithoutThumbnail',
                '@type': 'sc:Manifest',
                label: 'File without thumbnail',
            },
        ]
    };
});

router.get('/collection/folderWithThumbnail', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/folderWithThumbnail',
        '@type': 'sc:Collection',
        label: 'Folder with thumbnail',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/thumbnail',
        thumbnail: {
            '@id': ctx.request.origin + '/file-icon/folder.svg',
            format: 'image/svg+xml'
        }
    };
});

router.get('/collection/folderWithoutThumbnail', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/folderWithoutThumbnail',
        '@type': 'sc:Collection',
        label: 'Folder without thumbnail',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/thumbnail',
    };
});

router.get('/collection/folderWithThumbnailService', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/folderWithThumbnailService',
        '@type': 'sc:Collection',
        label: 'Folder with image service thumbnail',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/thumbnail',
        thumbnail: {
            '@id': ctx.request.origin + '/thumbnail/folderWithThumbnailService',
            format: 'image/svg+xml',
            service: {
                '@id': ctx.request.origin + '/image/ariel',
                protocol: "http://iiif.io/api/image",
                width: 3507,
                height: 2480,
                sizes: [],
                profile: "http://iiif.io/api/image/2/level2.json"
            }
        }
    };
});


router.get('/manifest/fileWithoutThumbnail', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/fileWithoutThumbnail',
        '@type': 'sc:Manifest',
        label: 'File without thumbnail',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/thumbnail',
    };
});


export default router.routes();

