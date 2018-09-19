const Router = require('koa-router');
const router = new Router();
const path = require('path');
const download = require('../lib/Download');

router.get('/collection/language', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/language',
        '@type': 'sc:Collection',
        label: 'Language test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        manifests: [
            {
                '@id': ctx.request.origin + '/manifest/languageFile1',
                '@type': 'sc:Manifest',
                label: 'colecções digitais afluência.docx',
            },
            {
                '@id': ctx.request.origin + '/manifest/languageFile2',
                '@type': 'sc:Manifest',
                label: 'Приток цифровых коллекций.docx',
            },
            {
                '@id': ctx.request.origin + '/manifest/languageFile3',
                '@type': 'sc:Manifest',
                label:  'مجموعه های دیجیتال جریان.docx',
            },
            {
                '@id': ctx.request.origin + '/manifest/languageFile4',
                '@type': 'sc:Manifest',
                label: 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx',
            },
            {
                '@id': ctx.request.origin + '/manifest/languageFile5',
                '@type': 'sc:Manifest',
                label: '流入數字館藏.docx',
            }
        ]
    };
});

function languageFilePresentation(ctx, id, label) {
    return {
        '@id': ctx.request.origin + '/manifest/' + id,
        '@type': 'sc:Manifest',
        'label': label,
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/language',
        mediaSequences: [{
        '@id': ctx.request.origin + '/sequence/' + id,
        '@type': 'ixif:MediaSequence',
        'elements': [{
            '@id': ctx.request.origin + '/file/' + id,
            '@type': 'foaf:Document',
            'format': 'text/plain'
        }]
    }]
    };
}

router.get('/manifest/languageFile1', ctx => {
    ctx.body = languageFilePresentation(ctx, 'languageFile1', 'colecções digitais afluência.docx');
});

router.get('/manifest/languageFile2', ctx => {
    ctx.body = languageFilePresentation(ctx, 'languageFile2', 'Приток цифровых коллекций.docx');
});

router.get('/manifest/languageFile3', ctx => {
    ctx.body = languageFilePresentation(ctx, 'languageFile3', 'مجموعه های دیجیتال جریان.docx');
});

router.get('/manifest/languageFile4', ctx => {
    ctx.body = languageFilePresentation(ctx, 'languageFile4', 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx');
});

router.get('/manifest/languageFile5', ctx => {
    ctx.body = languageFilePresentation(ctx, 'languageFile5', '流入數字館藏.docx');
});


router.get('/file/languageFile1', async  ctx => {
    const filePath = path.join(__dirname, 'colecções digitais afluência.docx');
    await download(ctx, filePath);
});

router.get('/file/languageFile2', async  ctx => {
    const filePath = path.join(__dirname, 'Приток цифровых коллекций.docx');
    await download(ctx, filePath);
});

router.get('/file/languageFile3', async  ctx => {
    const filePath = path.join(__dirname, 'مجموعه های دیجیتال جریان.docx');
    await download(ctx, filePath);
});

router.get('/file/languageFile4', async  ctx => {
    const filePath = path.join(__dirname, 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx');
    await download(ctx, filePath);
});

router.get('/file/languageFile5', async  ctx => {
    const filePath = path.join(__dirname, '流入數字館藏.docx');
    await download(ctx, filePath);
});

module.exports = router;
