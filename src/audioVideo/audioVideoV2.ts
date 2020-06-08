import * as Router from 'koa-router';
import * as path from 'path';
import download from '../lib/Download';

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/audioVideo', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/collection/audioVideo',
        '@type': 'sc:Collection',
        label: 'Audio & video test case',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        license: 'http://creativecommons.org/licenses/by-sa/3.0/',
        manifests: [
            {
                '@id': ctx.request.origin + prefix + '/manifest/die_internationale_as_mp3',
                '@type': 'sc:Manifest',
                label: 'Die Internationale as mp3.mp3',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/mp3.svg',
                    format: 'image/svg+xml'
                }
            },
            {
                '@id': ctx.request.origin + prefix + '/manifest/f113',
                '@type': 'sc:Manifest',
                label: 'F113.mp4',
                thumbnail: {
                    '@id': ctx.request.origin + '/file-icon/mp4.svg',
                    format: 'image/svg+xml'
                }
            }
        ]
    };
});


router.get('/manifest/die_internationale_as_mp3', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + ctx.request.url,
        '@type': 'sc:Manifest',
        'label': 'Die_Internationale as mp3.mp3',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'license': 'http://creativecommons.org/licenses/by-sa/3.0/',
        'within': ctx.request.origin + '/collection/audioVideo',
        'metadata': [
            {
                'label': 'Original file type',
                'value': '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=687\">MPEG 1/2 Audio Layer 3 (.mp3)</a>'
            },
            {
                'label': 'Original file size',
                'value': '242.04 KB'
            },
            {
                'label': 'Original modification date',
                'value': 'July 11th 2018'
            }
        ],
        thumbnail: {
            '@id': ctx.request.origin + '/file-icon/mp3.svg',
            format: 'image/svg+xml'
        },
        'mediaSequences': [{
            '@id': ctx.request.origin + '/sequence/die_internationale_as_mp3',
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': ctx.request.origin + '/file/die_internationale_as_mp3',
                '@type': 'dctypes:Sound',
                'format': 'audio/mpeg',
                'rendering': {
                    '@id': ctx.request.origin + '/file/die_internationale_as_mp3/original',
                    'label': 'Original copy',
                    'format': 'audio/mpeg'
                }
            }]
        }]
    };
});

router.get('/file/die_internationale_as_mp3', async ctx => {
    const filePath = path.join(__dirname, 'die_internationale_as_mp3.mp3');
    await download(ctx, filePath);
});

router.get('/file/die_internationale_as_mp3/original', async ctx => {
    const filePath = path.join(__dirname, 'die_internationale_as_mp3.mp3');
    await download(ctx, filePath);
});

router.get('/manifest/f113', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + ctx.request.url,
        '@type': 'sc:Manifest',
        'label': 'F113.mp4',
        '@context': 'http://iiif.io/api/collection/2/context.json',
        'license': 'http://creativecommons.org/licenses/by-sa/3.0/',
        'within': ctx.request.origin + '/collection/audioVideo',
        'metadata': [
            {
                'label': 'Original file type',
                'value': '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=924\">MPEG-4 Media File (.f4a, .f4v, .m4a, .m4v, .mp4)</a>'
            },
            {
                'label': 'Original file size',
                'value': '6.86 MB'
            },
            {
                'label': 'Original modification date',
                'value': 'July 11th 2018'
            }
        ],
        thumbnail: {
            '@id': ctx.request.origin + '/file-icon/mp3.svg',
            format: 'image/svg+xml'
        },
        mediaSequences: [{
            '@id': ctx.request.origin + '/sequence/f113',
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': ctx.request.origin + '/file/f113',
                '@type': 'dctypes:Document',
                'format': 'video/mp4',
                'rendering': {
                    '@id': ctx.request.origin + '/file/f113/original',
                    'label': 'Original copy',
                    'format': 'video/mp4'
                }
            }]
        }]
    };
});

router.get('/file/f113', async ctx => {
    const filePath = path.join(__dirname, 'F113.mp4');
    await download(ctx, filePath);
});

export default router.routes();
