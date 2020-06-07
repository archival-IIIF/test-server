import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/language', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Language test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        items: [
            {
                id: ctx.request.origin + prefix + '/manifest/languageFile1',
                type: 'Manifest',
                label: {none: ['colecções digitais afluência.docx']},
            },
            {
                id: ctx.request.origin + prefix + '/manifest/languageFile2',
                type: 'Manifest',
                label: {none: ['Приток цифровых коллекций.docx']},
            },
            {
                id: ctx.request.origin + prefix + '/manifest/languageFile3',
                type: 'Manifest',
                label:  {none: ['مجموعه های دیجیتال جریان.docx']},
            },
            {
                id: ctx.request.origin + prefix + '/manifest/languageFile4',
                type: 'Manifest',
                label: {none: ['অন্তর্বাহ ডিজিটাল সংগ্রহ.docx']},
            },
            {
                id: ctx.request.origin + prefix + '/manifest/languageFile5',
                type: 'Manifest',
                label: {none: ['流入數字館藏.docx']},
            }
        ]
    };
});

function languageFilePresentation(ctx: Router.RouterContext, id: string, label: string) {
    return {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {none: [label]},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + '/collection/language', type: 'Collection'}],
        rendering: [{
            id: ctx.request.origin + '/file/' + id,
            type: 'Text',
            label: {en: ['Original copy']},
            format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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


export default router.routes();

