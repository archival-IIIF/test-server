const Router = require('koa-router');
const router = new Router();

router.get('/collection/rightsInformation', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/rightsInformation',
        '@type': 'sc:Collection',
        label: 'Rights information test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/collection/fileWithLicense',
                '@type': 'sc:Manifest',
                label: 'File with license.txt',
            },
            {
                '@id': ctx.request.origin + '/collection/fileWithoutLicense',
                '@type': 'sc:Manifest',
                label: 'File without license.txt',
            }
            ,
            {
                '@id': ctx.request.origin + '/collection/fileWithAttribution',
                '@type': 'sc:Manifest',
                label: 'File with attribution.txt',
            }
        ]
    };
});


router.get('/collection/fileWithAttribution', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/fileWithAttribution',
        '@type': 'sc:Manifest',
        'label': 'File with attribution.txt',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'attribution': 'Provided by Example Organization',
        'within': ctx.request.origin + '/collection/rightsInformation',
        'metadata': [
            {
                'label': 'Original file type',
                'value': '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=163\">Plain Text File (.txt)</a>'
            },
            {
                'label': 'Original file size',
                'value': '1 KB'
            },
            {
                'label': 'Original modification date',
                'value': 'July 11th 2018'
            }
        ],
        mediaSequences: [{
            '@id': ctx.request.origin + '/collection/fileWithAttribution/sequence/0',
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': ctx.request.origin + '/file/txt',
                '@type': 'foaf:Document',
                'format': 'text/plain',
                'rendering': {
                    '@id': ctx.request.origin + '/file/txt/original',
                    'label': 'Original copy',
                    'format': 'text/plain'
                }
            }]
        }]
    };
});


router.get('/collection/fileWithLicense', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/fileWithLicense',
        '@type': 'sc:Manifest',
        'label': 'File with license.txt',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        'within': ctx.request.origin + '/collection/rightsInformation',
        'metadata': [
            {
                'label': 'Original file type',
                'value': '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=163\">Plain Text File (.txt)</a>'
            },
            {
                'label': 'Original file size',
                'value': '1 KB'
            },
            {
                'label': 'Original modification date',
                'value': 'July 11th 2018'
            }
        ],
        mediaSequences: [{
            '@id': ctx.request.origin + '/collection/fileWithLicense/sequence/0',
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': ctx.request.origin + '/file/txt',
                '@type': 'foaf:Document',
                'format': 'text/plain',
                'rendering': {
                    '@id': ctx.request.origin + '/file/txt/original',
                    'label': 'Original copy',
                    'format': 'text/plain'
                }
            }]
        }]
    };
});




router.get('/collection/fileWithoutLicense', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/fileWithoutLicense',
        '@type': 'sc:Manifest',
        'label': 'File without license.txt',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'within': ctx.request.origin + '/collection/rightsInformation',
        'metadata': [
            {
                'label': 'Original file type',
                'value': '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=163\">Plain Text File (.txt)</a>'
            },
            {
                'label': 'Original file size',
                'value': '1 KB'
            },
            {
                'label': 'Original modification date',
                'value': 'July 11th 2018'
            }
        ],
        mediaSequences: [{
            '@id': ctx.request.origin + '/collection/fileWithoutLicense/sequence/0',
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': ctx.request.origin + '/file/txt',
                '@type': 'foaf:Document',
                'format': 'text/plain',
                'rendering': {
                    '@id': ctx.request.origin + '/file/txt/original',
                    'label': 'Original copy',
                    'format': 'text/plain'
                }
            }]
        }]
    };
});

module.exports = router;
