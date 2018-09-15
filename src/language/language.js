const Router = require('koa-router');
const router = new Router();
const path = require('path');
const download = require('../lib/Download');

router.get('/presentation/language', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/language',
        '@type': 'sc:Collection',
        label: 'Language test case',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/presentation/languageFile1',
                '@type': 'sc:Manifest',
                label: 'colecções digitais afluência.docx',
            },
            {
                '@id': ctx.request.origin + '/presentation/languageFile2',
                '@type': 'sc:Manifest',
                label: 'Приток цифровых коллекций.docx',
            },
            {
                '@id': ctx.request.origin + '/presentation/languageFile3',
                '@type': 'sc:Manifest',
                label:  'مجموعه های دیجیتال جریان.docx',
            },
            {
                '@id': ctx.request.origin + '/presentation/languageFile4',
                '@type': 'sc:Manifest',
                label: 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx',
            },
            {
                '@id': ctx.request.origin + '/presentation/languageFile5',
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

router.get('/presentation/languageFile1', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language1', 'colecções digitais afluência.docx');
});

router.get('/presentation/languageFile2', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language2', 'Приток цифровых коллекций.docx');
});

router.get('/presentation/languageFile3', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language3', 'مجموعه های دیجیتال جریان.docx');
});

router.get('/presentation/languageFile4', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language4', 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx');
});

router.get('/presentation/languageFile5', ctx => {
    ctx.body = languageFilePresentation(ctx, 'language5', '流入數字館藏.docx');
});


router.get('/file/language1', async  ctx => {
    const filePath = path.join(__dirname, 'colecções digitais afluência.docx');
    await download(ctx, filePath);
});

router.get('/file/language2', async  ctx => {
    const filePath = path.join(__dirname, 'Приток цифровых коллекций.docx');
    await download(ctx, filePath);
});

router.get('/file/language3', async  ctx => {
    const filePath = path.join(__dirname, 'مجموعه های دیجیتال جریان.docx');
    await download(ctx, filePath);
});

router.get('/file/language4', async  ctx => {
    const filePath = path.join(__dirname, 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx');
    await download(ctx, filePath);
});

router.get('/file/language5', async  ctx => {
    const filePath = path.join(__dirname, '流入數字館藏.docx');
    await download(ctx, filePath);
});

module.exports = router;
