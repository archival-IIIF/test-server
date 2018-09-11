const Router = require('koa-router');
const router = new Router();

const path = require('path');
const download = require('../lib/Download');

router.get('/presentation/logo', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/logo',
        '@type': 'sc:Collection',
        label: 'Logo test case',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        logo: ctx.request.origin + '/logo',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + '/presentation/fileWithLogo',
                '@type': 'sc:Manifest',
                label: 'File with logo.txt',
            },
            {
                '@id': ctx.request.origin + '/presentation/fileWithoutLogo',
                '@type': 'sc:Manifest',
                label: 'File without logo.txt',
            }
        ]
    };
});


router.get('/presentation/fileWithLogo', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/fileWithLogo',
        '@type': 'sc:Manifest',
        logo: ctx.request.origin + '/logo',
        'label': 'File with logo.txt',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/logo',
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
            '@id': ctx.request.origin + '/presentation/fileWithLogo/sequence/0',
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



router.get('/presentation/fileWithoutLogo', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/fileWithoutLogo',
        '@type': 'sc:Manifest',
        'label': 'File without logo.txt',
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        'within': ctx.request.origin + '/presentation/logo',
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
            '@id': ctx.request.origin + '/presentation/fileWithoutLogo/sequence/0',
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

router.get('/logo', async  ctx => {
    const filePath = path.join(__dirname, 'logo.png');
    await download(ctx, filePath);
});

module.exports = router;
