import * as Router from 'koa-router';

const router: Router = new Router();

router.get('/collection/contentLanguage1', ctx => {
    ctx.set('Content-Language', 'de-DE');
    ctx.body = {
        '@id': ctx.request.origin + '/collection/contentLanguage1',
        '@type': 'sc:Collection',
        label: 'Content-language = de-De',
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});

router.get('/collection/contentLanguage2', ctx => {
    //ctx.set('Content-Language', 'de-DE, en-US');
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/contentLanguage4',
        '@type': 'sc:Collection',
        label: [
            {"@value": "my label en", "@language": "en"},
            {"@value": "my label de", "@language": "de"}
        ],
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };
});

router.get('/manifest/contentLanguage3', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/contentLanguage3',
        '@type': 'sc:Manifest',
        label: {"@value": "my label", "@language": "en"},
        description: {"@value": "Here is a longer description of the object", "@language": "en"},
        '@context': 'http://iiif.io/api/collection/2/context.json',
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


router.get('/manifest/contentLanguage4', ctx => {
    ctx.body = {
        '@id': ctx.request.origin + '/manifest/contentLanguage4',
        '@type': 'sc:Manifest',
        label: [
            {"@value": "my label en", "@language": "en"},
            {"@value": "my label de", "@language": "de"}
        ],
        description: {"@value": "Here is a longer description of the object", "@language": "en"},
        '@context': 'http://iiif.io/api/collection/2/context.json',
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

export default router.routes();
