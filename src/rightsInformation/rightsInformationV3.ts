import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/rightsInformation', (ctx: Router.RouterContext) => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Rights information test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        items: [
            {
                id: ctx.request.origin + prefix + '/manifest/fileWithLicense',
                type: 'Manifest',
                label: {en: ['File with license.txt']}
            },
            {
                id: ctx.request.origin + prefix + '/manifest/fileWithoutLicense',
                type: 'Manifest',
                label: {en: ['File without license.txt']}
            },
            {
                id: ctx.request.origin + prefix + '/manifest/fileWithAttribution',
                type: 'Manifest',
                label: {en: ['File with attribution.txt']}
            }
        ]
    };
});


router.get('/manifest/fileWithAttribution', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {en: ['File with attribution.txt']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        requiredStatement: 'Provided by Example Organization',
        partOf: [{id: ctx.request.origin + prefix + '/collection/rightsInformation', type: 'Collection'}],
        metadata: [
            {
                label: {en: ['Original file type']},
                value: '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=163\">Plain Text File (.txt)</a>'
            },
            {
                label: {en: ['Original file size']},
                value: '1 KB'
            },
            {
                label: {en: ['Original modification date']},
                value: 'July 11th 2018'
            }
        ],
        mediaSequences: [{
            id: ctx.request.origin + prefix + '/sequence/fileWithAttribution',
            type: 'ixif:MediaSequence',
            'elements': [{
                id: ctx.request.origin + '/file/txt',
                type: 'foaf:Document',
                format: 'text/plain',
                rendering: {
                    id: ctx.request.origin + '/file/txt/original',
                    label: {en: ['Original copy']},
                    format: 'text/plain'
                }
            }]
        }]
    };
});


router.get('/manifest/fileWithLicense', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {en: ['File with license.txt']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        partOf: [{id: ctx.request.origin + prefix + '/collection/rightsInformation', type: 'Collection'}],
        metadata: [
            {
                label: {en: ['Original file type']},
                value: '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=163\">Plain Text File (.txt)</a>'
            },
            {
                label: {en: ['Original file size']},
                value: '1 KB'
            },
            {
                label: {en: ['Original modification date']},
                value: 'July 11th 2018'
            }
        ],
        mediaSequences: [{
            id: ctx.request.origin + prefix + '/sequence/fileWithLicense',
            type: 'ixif:MediaSequence',
            'elements': [{
                id: ctx.request.origin + '/file/loreIpsum',
                type: 'foaf:Document',
                format: 'text/plain',
                rendering: {
                    id: ctx.request.origin + '/file/txt/original',
                    label: {en: ['Original copy']},
                    format: 'text/plain'
                }
            }]
        }]
    };
});


router.get('/manifest/fileWithoutLicense', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: 'File without license.txt',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/rightsInformation', type: 'Collection'}],
        metadata: [
            {
                label: 'Original file type',
                value: '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=163\">Plain Text File (.txt)</a>'
            },
            {
                label: 'Original file size',
                value: '1 KB'
            },
            {
                label: 'Original modification date',
                value: 'July 11th 2018'
            }
        ],
        mediaSequences: [{
            id: ctx.request.origin + prefix + '/sequence/fileWithoutLicense',
            type: 'ixif:MediaSequence',
            elements: [{
                id: ctx.request.origin + '/file/txt',
                type: 'foaf:Document',
                format: 'text/plain',
                rendering: {
                    id: ctx.request.origin + '/file/txt/original',
                    label: 'Original copy',
                    format: 'text/plain'
                }
            }]
        }]
    };
});

export default router.routes();
