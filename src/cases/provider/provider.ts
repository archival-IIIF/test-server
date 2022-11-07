import {ParameterizedContext} from "koa";
import {getIIIFRouteTree, getImageBody2} from "../../lib/Route";
import {Base} from "@archival-iiif/presentation-builder";

const providerManifest = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody2(ctx, prefix, path, 'Image with provider information');
    // provider
    const provider = new Base('https://example.org/about', 'Agent', { "en": [ "Example Organization" ] });
    provider.setHomepage({
        format: 'text/html',
        id: 'https://example.org/info/book1/',
        label: {
            en: [
                'Home page for Book 1'
            ]
        },
        type: 'Text'
    });
    manifest.setProvider(provider);

    return manifest;
}



export default getIIIFRouteTree([
    {
        path: '/manifest/provider',
        body: providerManifest,
        images: [
            __dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg',
        ]
    }
]);
