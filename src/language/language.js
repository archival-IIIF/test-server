const Router = require('koa-router');
const router = new Router();
const path = require('path');
const mime = require('mime-types');
const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const HttpError = require('../lib/HttpError');

router.get('/presentation/language', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/language',
        '@type': 'sc:Collection',
        label: 'Language test case',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/presentation/language1',
                '@type': 'sc:Manifest',
                label: 'colecções digitais afluência.docx',
            },
            {
                '@id': ctx.request.origin + '/presentation/language2',
                '@type': 'sc:Manifest',
                label: 'Приток цифровых коллекций.docx',
            },
            {
                '@id': ctx.request.origin + '/presentation/language3',
                '@type': 'sc:Manifest',
                label:  'مجموعه های دیجیتال جریان.docx',
            },
            {
                '@id': ctx.request.origin + '/presentation/language4',
                '@type': 'sc:Manifest',
                label: 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx',
            },
            {
                '@id': ctx.request.origin + '/presentation/language5',
                '@type': 'sc:Manifest',
                label: '流入數字館藏.docx',
            }
        ]
    };
});

function languageFilePresentation(ctx, id, label) {
    return {
        '@id': ctx.request.origin + '/presentation/' + id,
        '@type': 'sc:Manifest',
        'label': label,
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/language',
        mediaSequences: [{
        '@id': ctx.request.origin + '/presentation/' + id + '/sequence/0',
        '@type': 'ixif:MediaSequence',
        'elements': [{
            '@id': ctx.request.origin + '/file/' + id,
            '@type': 'foaf:Document',
            'format': 'text/plain'
        }]
    }]
    };
}

router.get('/presentation/language1', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language1', 'colecções digitais afluência.docx');
});

router.get('/presentation/language2', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language2', 'Приток цифровых коллекций.docx');
});

router.get('/presentation/language3', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language3', 'مجموعه های دیجیتال جریان.docx');
});

router.get('/presentation/language4', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language4', 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx');
});

router.get('/presentation/language5', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language5', '流入數字館藏.docx');
});

async function languageFileDownload(ctx, filename) {
    try {
        let filePath = './src/language/' + filename;
        ctx.set('Content-Type', mime.contentType(path.basename(filePath)));
        ctx.body = await readFileAsync(filePath);
    }
    catch (err) {
        throw new HttpError(404);
    }
}

router.get('/file/language1', async  ctx => {
    await languageFileDownload(ctx, 'colecções digitais afluência.docx')
});

router.get('/file/language2', async  ctx => {
    await languageFileDownload(ctx, 'Приток цифровых коллекций.docx')
});

router.get('/file/language3', async  ctx => {
    await languageFileDownload(ctx, 'مجموعه های دیجیتال جریان.docx')
});

router.get('/file/language4', async  ctx => {
    await languageFileDownload(ctx, 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx')
});

router.get('/file/language5', async  ctx => {
    await languageFileDownload(ctx, '流入數字館藏.docx')
});

module.exports = router;
