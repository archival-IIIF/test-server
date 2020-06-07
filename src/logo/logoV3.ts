import * as Router from 'koa-router';
import * as path from 'path';

import download from '../lib/Download';
const prefix = '/iiif/v3';
const router: Router = new Router({prefix});


router.get('/collection/logo', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Logo test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        logo: {
            id: ctx.request.origin + '/logo',
            type: 'Image',
            format: 'image/jpeg',
            height: 100,
            width: 120
        },
        items: [
            {
                id: ctx.request.origin + prefix + '/manifest/fileWithLogo',
                type: 'Manifest',
                label: {en: ['File with logo.txt']}
            },
            {
                id: ctx.request.origin + prefix + '/manifest/fileWithoutLogo',
                type: 'Manifest',
                label: {en: ['File without logo.txt']}
            }
        ],
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
    };
});


router.get('/manifest/fileWithLogo', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        logo: {
            id: ctx.request.origin + '/logo',
            type: 'Image',
            format: 'image/jpeg',
            height: 100,
            width: 120
        },
        label: {en: ['File with logo.txt']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/logo', type: 'Collection'}],
        metadata: [
            {
                label: {en: ['Original file type']},
                value: {none: ['<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=163\">Plain Text File (.txt)</a>']}
            },
            {
                label: {en: ['Original file size']},
                value: {none: ['1 KB']}
            },
            {
                label: {en: ['Original modification date']},
                value: {none: ['July 11th 2018']}
            }
        ],
        mediaSequences: [{
            id: ctx.request.origin + '/sequence/fileWithLogo',
            type: 'ixif:MediaSequence',
            elements: [{
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



router.get('/manifest/fileWithoutLogo', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {en: ['File without logo.txt']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: [{id: ctx.request.origin + prefix + '/collection/logo', type: 'Collection'}],
        metadata: [
            {
                label: {en: ['Original file type']},
                value: {none: ['<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=163\">Plain Text File (.txt)</a>']}
            },
            {
                label: {en: ['Original file size']},
                value:  {none: ['1 KB']}
            },
            {
                label: {en: ['Original modification date']},
                value:  {none: ['July 11th 2018']}
            }
        ],
        mediaSequences: [{
            id: ctx.request.origin + '/sequence/fileWithLogo',
            type: 'ixif:MediaSequence',
            elements: [{
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

export default router.routes();
