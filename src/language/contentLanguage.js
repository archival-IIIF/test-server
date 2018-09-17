const Router = require('koa-router');
const router = new Router();

router.get('/presentation/contentLanguage1', ctx => {
    ctx.set('Content-Language', 'de-DE');
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/contentLanguage1',
        '@type': 'sc:Collection',
        label: 'Content-language = de-De',
        '@context': 'http://iiif.io/api/presentation/2/context.json'
    };
});

router.get('/presentation/contentLanguage2', ctx => {
    ctx.set('Content-Language', 'de-DE, en-US');
    ctx.body = {
        '@id': ctx.request.origin + '/presentation/contentLanguage2',
        '@type': 'sc:Collection',
        label: 'Content-language = de-De',
        '@context': 'http://iiif.io/api/presentation/2/context.json'
    };
});

module.exports = router;
