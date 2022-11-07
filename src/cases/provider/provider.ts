import {ParameterizedContext} from "koa";
import {getIIIFRouteTree} from "../../lib/Route";
import {Base} from "@archival-iiif/presentation-builder";
import ImageManifest from "../../lib/ImageManifest";


const providerManifest = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = new ImageManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + prefix + path.replace('/manifest/', '/image/') + '_0',
    'Image with provider information',
        1,
        1,
    );

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
