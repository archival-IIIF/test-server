import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/multiLang', ctx => {
    ctx.body = {
        "id": ctx.request.origin + prefix +  "/collection/multiLang",
        "type": "Collection",
        "label": {
            "en": ["Folder"],
            "de": ["Ordner"],
        },
        "@context": "http://iiif.io/api/presentation/3/context.json",
        "items": [{
            "id": ctx.request.origin + prefix + "/manifest/multiLang",
            "type": "Manifest",
            "label": {
                "en": ["File"],
                "de": ["Datei"],
            }
        }],
        "metadata": [
            {
                "label": { "en": [ "Title" ], "de": [ "Titel" ] },
                "value": { "en": [ "Folder" ], "de": [ "Ordner"] }
            },
            {
                "label": { "en": [ "Only en label" ] },
                "value": { "en": [ "Only en value" ] }
            },
            {
                "label": { "en": [ "Only de label" ] },
                "value": { "en": [ "Only de value" ] }
            }
        ]
    }
});

router.get('/manifest/multiLang', ctx => {
    ctx.body = {
        "id": ctx.request.origin + prefix + "/manifest/multiLang",
        "type": "Manifest",
        "label": {
            "en": ["File"],
            "de": ["Datei"],
        },
        "@context": "http://iiif.io/api/presentation/3/context.json",
        "partOf": ctx.request.origin + prefix + "collection/multiLang",
        "metadata": [
            {
                "label": { "en": [ "Title" ], "de": [ "Titel" ] },
                "value": { "en": [ "File" ], "de": [ "Datei"] }
            },
        ]
    }
});

export default router.routes();
