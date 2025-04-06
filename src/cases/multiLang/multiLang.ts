import {ParameterizedContext} from "koa";
import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {defaultImage} from "../../lib/Image";
import {Internationalize} from "@archival-iiif/presentation-builder/v3";


const multiLangManifest = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const label: Internationalize = {
        'en': ['Image with metadata in different languages'],
        'de': ['Bild mit Metadaten in verschiedenen Sprachen']
    };
    const manifest = getImageBody(ctx, prefix, path, label, undefined, undefined, defaultImage);
    manifest.setMetadata({
        'label': {'en': ['Title'], 'de': ['Titel']},
        'value': {'en': ['Image-File'], 'de': ['Bild-Datei']}
    });

    return manifest;
}

export default getIIIFRouteTree([
    {
        path: '/manifest/multiLang',
        body: multiLangManifest,
        images: defaultImage
    }
]);

