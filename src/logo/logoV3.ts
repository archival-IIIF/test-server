import * as Router from 'koa-router';
import * as path from 'path';

import download from '../lib/Download';
const prefix = '/iiif/v3';
const router: Router = new Router({prefix});


router.get('/collection/logo', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: 'Logo test case',
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
                label: 'File with logo.txt',
            },
            {
                id: ctx.request.origin + prefix + '/manifest/fileWithoutLogo',
                type: 'Manifest',
                label: 'File without logo.txt',
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
        label: 'File with logo.txt',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: ctx.request.origin + prefix + '/collection/logo',
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
            id: ctx.request.origin + '/sequence/fileWithLogo',
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



router.get('/manifest/fileWithoutLogo', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: 'File without logo.txt',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: ctx.request.origin + prefix + '/collection/logo',
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
            id: ctx.request.origin + '/sequence/fileWithLogo',
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