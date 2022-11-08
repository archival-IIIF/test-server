import {ParameterizedContext} from "koa";
import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {Base} from "@archival-iiif/presentation-builder";
import RootCollection from "../../lib/RootCollection";

const images = [
    __dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg',
];

const collection = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new RootCollection(ctx.request.origin + prefix + path, 'Homepage test case');


const homepage1 = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with homepage', undefined,
        undefined, images);
    manifest.setHomepage({
        format: 'text/html',
        id: 'https://example.org',
        label: {
            en: [
                'Home page for Image 1'
            ],
            de: [
                'Homepage für Bild 1'
            ]
        },
        type: 'Text'
    });

    return manifest;
}

const homepage2 = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with multi lang homepages', undefined,
        undefined, images);
    manifest.setHomepage(
        [
            {
                format: 'text/html',
                id: 'https://example.org',
                label: {en: ['Home page for Image 1']},
                type: 'Text',
                language: ['en']
            },
            {
                format: 'text/html',
                id: 'https://example.org/de',
                label: {de: ['Homepage für Bild 1']},
                type: 'Text',
                language: ['de']
            }
        ] as any
    );

    return manifest;
}

const homepage3 = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with provider homepage', undefined,
        undefined, images);
    const provider = new Base('https://example.org/about', 'Agent', { "en": [ "Example Organization" ] });
    provider.setHomepage({
        format: 'text/html',
        id: 'https://example.org',
        label: {
            en: [
                'Home page for Image 1'
            ],
            de: [
                'Homepage für Bild 1'
            ]
        },
        type: 'Text'
    });
    manifest.setProvider(provider);

    return manifest;
}

export default getIIIFRouteTree([
    {
        path: '/collection/homepage',
        body: collection,
        children: [
            {
                path: '/manifest/homepage1',
                body: homepage1,
                images
            },
            {
                path: '/manifest/homepage2',
                body: homepage2,
                images
            },
            {
                path: '/manifest/homepage3',
                body: homepage3,
                images
            }
        ]
    }
]);
