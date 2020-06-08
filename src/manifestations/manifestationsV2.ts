import * as Router from 'koa-router';

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

import * as path from 'path';
import download from '../lib/download';

router.get('/collection/manifestations', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/manifestations',
        '@type': 'sc:Collection',
        label: 'manifestation test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/manifestation',
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

router.get('/manifest/manifestation', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/manifestation',
        '@type': 'sc:Manifest',
        label: 'test.docx',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: ctx.request.origin + '/collection/manifestations',
        mediaSequences: [{
            '@id': ctx.request.origin + '/sequence/manifestation',
            '@type': 'ixif:MediaSequence',
            elements: [{
                '@id': ctx.request.origin + '/file/manifestation',
                '@type': 'foaf:Document',
                format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }]
        }],
        rendering: [
            {
                '@id': ctx.request.origin + '/file/manifestation/access',
                label: 'test.pdf (Access copy)',
                format: 'application/pdf'
            },
            {
                '@id': ctx.request.origin + '/file/manifestation/original',
                label: 'test.docx (Original file)',
                format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
        ]
    };
});

router.get('/file/manifestation', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/PDFa.pdf');
    await download(ctx, filePath);
});

router.get('/file/manifestation/original', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/test.docx');
    await download(ctx, filePath);
});

router.get('/file/manifestation/access', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/PDFa.pdf');
    await download(ctx, filePath);
});

export default router.routes();
