import * as Router from 'koa-router';

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/multiLang', ctx => {
    ctx.body = {
        "@id": "http://localhost:3333/iiif/v2/collection/multiLang",
        "@type": "sc:Collection",
        "label": {
            "en": ["Folder"],
            "de": ["Ordner"],
        },
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "manifests": [{
            "id": "http://localhost:3333/iiif/v2/manifest/multiLang",
            "type": "sc:Manifest",
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
        "@id": "http://localhost:3333/iiif/v2/manifest/multiLang",
        "@type": "Manifest",
        "label": {
            "en": ["File"],
            "de": ["Datei"],
        },
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "within": '/collection/multiLang',
        "metadata": [
            {
                "label": { "en": [ "Title" ], "de": [ "Titel" ] },
                "value": { "en": [ "File" ], "de": [ "Datei"] }
            },
        ]
    }
});

export default router.routes();
