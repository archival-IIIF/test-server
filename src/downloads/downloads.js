const Router = require('koa-router');
const router = new Router();
const path = require('path');
const download = require('../lib/Download');

router.get('/collection/downloads', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/downloads',
        '@type': 'sc:Collection',
        label: 'Download test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/download',
                '@type': 'sc:Manifest',
                label: 'test.docx',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/docx.svg',
                    format: 'image/svg+xml'
                }
            }
        ]
    };
});

router.get('/manifest/download', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/download',
        '@type': 'sc:Manifest',
        label: 'test.docx',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/downloads',
        mediaSequences: [{
            '@id': ctx.request.origin + '/sequence/download',
            '@type': 'ixif:MediaSequence',
            elements: [{
                '@id': ctx.request.origin + '/file/download',
                '@type': 'foaf:Document',
                format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                rendering: [
                    {
                        '@id': ctx.request.origin + '/file/download/original',
                        label: 'Original copy',
                        format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    },
                    {
                        '@id': ctx.request.origin + '/file/download/accesss',
                        label: 'Access copy',
                        format: 'application/pdf'
                    }
                ]
            }]
        }]
    };
});

router.get('/file/download', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/PDFa.pdf');
    await download(ctx, filePath);
});

router.get('/file/download/original', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/test.docx');
    await download(ctx, filePath);
});

router.get('/file/download/access', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/PDFa.pdf');
    await download(ctx, filePath);
});

module.exports = router;
