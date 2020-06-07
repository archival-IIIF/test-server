import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/manifestations', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['manifestation test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        items: [
            {
                id: ctx.request.origin + prefix + '/manifest/manifestation',
                type: 'Manifest',
                label: {none: ['test.docx']},
                thumbnail: [{
                    id: ctx.request.origin + '/file-icon/docx.svg',
                    type: 'Image',
                    format: 'image/svg+xml'
                }]
            }
        ]
    };
});

router.get('/manifest/manifestation', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {none: ['test.docx']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + '/collection/manifestations', type: 'Collection'}],
        rendering: [
            {
                id: ctx.request.origin + '/file/manifestation/access',
                label: {none: ['test.pdf (Access copy)']},
                type: 'Text',
                format: 'application/pdf'
            },
            {
                id: ctx.request.origin + '/file/manifestation/original',
                label: {none: ['test.docx (Original file)']},
                type: 'Text',
                format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
        ]
    };
});

export default router.routes();
