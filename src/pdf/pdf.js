const Router = require('koa-router');
const router = new Router();

const path = require('path');
const mime = require('mime-types');
const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const HttpError = require('../lib/HttpError');

router.get('/presentation/pdf', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/pdf',
        '@type': 'sc:Collection',
        label: 'PDF test case',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        logo: ctx.request.origin + '/logo',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/presentation/pdf1',
                '@type': 'sc:Manifest',
                label: 'test.pdf',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/pdf.svg',
                    format: 'image/svg+xml'
                }
            },
            {
                '@id': ctx.request.origin + '/presentation/docx',
                '@type': 'sc:Manifest',
                label: 'test.docx',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/docx.svg',
                    format: 'image/svg+xml'
                }
            },
            {
                '@id': ctx.request.origin + '/presentation/pdfa',
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


router.get('/presentation/pdf1', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/pdf1',
        '@type': 'sc:Manifest',
        'label': 'test.pdf',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/pdf',
        mediaSequences: [{
            '@id': ctx.request.origin + '/presentation/pdf1/sequence/0',
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': ctx.request.origin + '/file/pdf1',
                '@type': 'foaf:Document',
                'format': 'application/pdf',
                'rendering': {
                    '@id': ctx.request.origin + '/file/pdf1/original',
                    'label': 'Original copy',
                    'format': 'application/pdf'
                }
            }]
        }]
    };
});



router.get('/presentation/docx', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/docx',
        '@type': 'sc:Manifest',
        'label': 'test.pdf',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/pdf',
        mediaSequences: [{
            '@id': ctx.request.origin + '/presentation/docx/sequence/0',
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': ctx.request.origin + '/file/docx',
                '@type': 'foaf:Document',
                'format': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'rendering': {
                    '@id': ctx.request.origin + '/file/docx/original',
                    'label': 'Original copy',
                    'format': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
            }]
        }]
    };
});


router.get('/presentation/pdfa', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/pdfa',
        '@type': 'sc:Manifest',
        'label': 'test.pdf',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/pdf',
        mediaSequences: [{
            '@id': ctx.request.origin + '/presentation/pdf1/sequence/0',
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': ctx.request.origin + '/file/pdfa',
                '@type': 'foaf:Document',
                'format': 'application/pdf',
                'rendering': {
                    '@id': ctx.request.origin + '/file/pdf1/original',
                    'label': 'Original copy',
                    'format': 'application/pdf'
                }
            }]
        }]
    };
});



router.get('/file/pdf1', async  ctx => {
    try {
        let filePath = './src/pdf/test.pdf';
        ctx.set('Content-Type', mime.contentType(path.basename(filePath)));
        ctx.body = await readFileAsync(filePath);
    }
    catch (err) {
        throw new HttpError(404);
    }
});

router.get('/file/docx', async  ctx => {
    try {
        let filePath = './src/pdf/test.docx';
        ctx.set('Content-Type', mime.contentType(path.basename(filePath)));
        ctx.body = await readFileAsync(filePath);
    }
    catch (err) {
        throw new HttpError(404);
    }
});

router.get('/file/pdfa', async  ctx => {
    try {
        let filePath = './src/pdf/PDFa.pdf';
        ctx.set('Content-Type', mime.contentType(path.basename(filePath)));
        ctx.body = await readFileAsync(filePath);
    }
    catch (err) {
        throw new HttpError(404);
    }
});

module.exports = router;
