import * as Router from 'koa-router';

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/multiLang', ctx => {
    ctx.body = {
        "@id": ctx.request.origin + prefix +  "/collection/multiLang",
        "@type": "sc:Collection",
        "label": [
            {"@value": "Folder", "@language": "en"},
            {"@value": "Ordner", "@language": "de"}
        ],
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "manifests": [{
            "id": ctx.request.origin + prefix + "/manifest/multiLang",
            "type": "sc:Manifest",
            "label": [
                {"@value": "File", "@language": "en"},
                {"@value": "Datei", "@language": "de"}
            ]
        }],
        "metadata": [
            {
                "label": [
                    {"@value": "Title", "@language": "en"},
                    {"@value": "Titel", "@language": "de"}
                ],
                "value": [
                    {"@value": "Folder", "@language": "en"},
                    {"@value": "Ordner", "@language": "de"}
                ]
            },
            {
                "label": [{"@value": "Only en label", "@language": "en"}],
                "value": [{"@value": "Only en value", "@language": "en"}]
            },
            {
                "label": [{"@value": "Nur de label", "@language": "de"}],
                "value": [{"@value": "Nur de value", "@language": "de"}]
            },
        ]
    }
});

router.get('/manifest/multiLang', ctx => {
    ctx.body = {
        "@id": ctx.request.origin + prefix + "/manifest/multiLang",
        "@type": "sc:Manifest",
        "label": [
            {"@value": "File", "@language": "en"},
            {"@value": "Datei", "@language": "de"}
        ],
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "within": ctx.request.origin + prefix + "/collection/multiLang",
        "metadata": [
            {
                "label": [
                    {"@value": "Title", "@language": "en"},
                    {"@value": "Titel", "@language": "de"}
                ],
                "value": [
                    {"@value": "File", "@language": "en"},
                    {"@value": "Datei", "@language": "de"}
                ]
            },
        ]
    }
});

export default router.routes();
