import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/pdf', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        '@type': 'sc:Collection',
        label: 'PDF test case',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        items: [
            {
                id: ctx.request.origin + prefix + '/manifest/pdf1',
                type: 'Manifest',
                label: 'test.pdf',
                thumbnail: {
                    id: ctx.request.origin + '/file-icon/pdf.svg',
                    format: 'image/svg+xml'
                }
            },
            {
                id: ctx.request.origin + prefix +'/manifest/docx',
                type: 'Manifest',
                label: 'test.docx',
                thumbnail: {
                    id: ctx.request.origin + '/file-icon/docx.svg',
                    format: 'image/svg+xml'
                }
            },
            {
                id: ctx.request.origin + prefix + '/manifest/pdfa',
                type: 'Manifest',
                label: 'PDFa.pdf',
                thumbnail: {
                    id: ctx.request.origin + '/file-icon/pdf.svg',
                    format: 'image/svg+xml'
                }
            }
        ]
    };
});


router.get('/manifest/pdf1', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {en: ['test.pdf']},
        '@context': [
            'http://iiif.io/api/presentation/3/context.json',
            'http://wellcomelibrary.org/ixif/0/context.json'
        ],
        partOf: [{
            id: ctx.request.origin + prefix + '/collection/pdf',
            type: 'Collection'
        }],
        mediaSequences: [{
            id: ctx.request.origin + prefix + '/sequence/pdf1',
            type: 'ixif:MediaSequence',
            elements: [{
                id: ctx.request.origin + '/file/pdf1',
                type: 'foaf:Document',
                format: 'application/pdf',
                rendering: [{
                    id: ctx.request.origin + '/file/pdf1/original',
                    label: {en: ['Original copy']},
                    format: 'application/pdf'
                }]
            }]
        }],
        rendering: [{
            id: ctx.request.origin + '/file/pdf1/original',
            type: 'Text',
            label: {en: ['Original copy']},
            format: 'application/pdf'
        }]
    };
});



router.get('/manifest/docx', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: 'test.pdf',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/pdf', type: 'Collection'}],
        mediaSequences: [{
            id: ctx.request.origin + prefix + '/sequence/docx',
            type: 'ixif:MediaSequence',
            elements: [{
                id: ctx.request.origin + '/file/docx',
                type: 'foaf:Document',
                format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                rendering: {
                    id: ctx.request.origin + '/file/docx/original',
                    label: 'Original copy',
                    format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
            }]
        }]
    };
});


router.get('/manifest/pdfa', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: 'test.pdf',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/pdf', type: 'Collection'}],
        mediaSequences: [{
            id: ctx.request.origin + prefix + '/sequence/pdfa',
            type: 'ixif:MediaSequence',
            elements: [{
                id: ctx.request.origin + '/file/pdfa',
                type: 'foaf:Document',
                format: 'application/pdf',
                rendering: {
                    id: ctx.request.origin + '/file/pdf1/original',
                    label: 'Original copy',
                    format: 'application/pdf'
                }
            }]
        }]
    };
});

export default router.routes();
