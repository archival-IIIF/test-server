import * as Router from 'koa-router';

const router: Router = new Router();

import * as path from 'path';
import download from '../lib/Download';

router.get('/collection/pdf', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/pdf',
        '@type': 'sc:Collection',
        label: 'PDF test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/pdf1',
                '@type': 'sc:Manifest',
                label: 'test.pdf',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/pdf.svg',
                    format: 'image/svg+xml'
                }
            },
            {
                '@id': ctx.request.origin + '/manifest/docx',
                '@type': 'sc:Manifest',
                label: 'test.docx',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/docx.svg',
                    format: 'image/svg+xml'
                }
            },
            {
                '@id': ctx.request.origin + '/manifest/pdfa',
                '@type': 'sc:Manifest',
                label: 'PDFa.pdf',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/pdf.svg',
                    format: 'image/svg+xml'
                }
            }
        ]
    };
});


router.get('/manifest/pdf1', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/pdf1',
        '@type': 'sc:Manifest',
        label: 'test.pdf',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/pdf',
        mediaSequences: [{
            '@id': ctx.request.origin + '/sequence/pdf1',
            '@type': 'ixif:MediaSequence',
            elements: [{
                '@id': ctx.request.origin + '/file/pdf1',
                '@type': 'foaf:Document',
                format: 'application/pdf',
                rendering: {
                    '@id': ctx.request.origin + '/file/pdf1/original',
                    label: 'Original copy',
                    format: 'application/pdf'
                }
            }]
        }]
    };
});



router.get('/manifest/docx', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/docx',
        '@type': 'sc:Manifest',
        label: 'test.pdf',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/pdf',
        mediaSequences: [{
            '@id': ctx.request.origin + '/sequence/docx',
            '@type': 'ixif:MediaSequence',
            elements: [{
                '@id': ctx.request.origin + '/file/docx',
                '@type': 'foaf:Document',
                format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                rendering: {
                    '@id': ctx.request.origin + '/file/docx/original',
                    label: 'Original copy',
                    format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
            }]
        }]
    };
});


router.get('/manifest/pdfa', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/pdfa',
        '@type': 'sc:Manifest',
        label: 'test.pdf',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/pdf',
        mediaSequences: [{
            '@id': ctx.request.origin + '/sequence/pdfa',
            '@type': 'ixif:MediaSequence',
            elements: [{
                '@id': ctx.request.origin + '/file/pdfa',
                '@type': 'foaf:Document',
                format: 'application/pdf',
                rendering: {
                    '@id': ctx.request.origin + '/file/pdf1/original',
                    label: 'Original copy',
                    format: 'application/pdf'
                }
            }]
        }]
    };
});



router.get('/file/pdf1', async  ctx => {
    const filePath = path.join(__dirname, 'test.pdf');
    await download(ctx, filePath);
});

router.get('/file/docx', async  ctx => {
    const filePath = path.join(__dirname, 'test.docx');
    await download(ctx, filePath);
});

router.get('/file/pdfa', async  ctx => {
    const filePath = path.join(__dirname, 'PDFa.pdf');
    await download(ctx, filePath);
});

export default router.routes();
