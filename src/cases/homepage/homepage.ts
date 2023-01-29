import {ParameterizedContext} from "koa";
import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {Base} from "@archival-iiif/presentation-builder";
import RootCollection from "../../lib/RootCollection";

const images = [
    __dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg',
];

const collection = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new RootCollection(ctx.request.origin + prefix + path, 'Homepage test case');


const homepage = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with homepage', undefined,
        undefined, images);
    manifest.setHomepage({
        format: 'text/html',
        id: 'https://example.org',
        label: {
            en: [
                'Image homepage'
            ],
            de: [
                'Bild-Homepage'
            ]
        },
        type: 'Text'
    });

    return manifest;
}

const severalHomepages = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Several homepages', undefined,
        undefined, images);
    manifest.setHomepage(
        [
            {
                format: 'text/html',
                id: 'https://example.org/1',
                label: {none: ['Image homepage 1']},
                type: 'Text',
            },
            {
                format: 'text/html',
                id: 'https://example.org/2',
                label: {none: ['Image homepage 2']},
                type: 'Text',
            }
        ] as any
    );

    return manifest;
}

const severalHomepagesWithDifferentLanguages = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Homepages in different languages', undefined,
        undefined, images);
    manifest.setHomepage(
        [
            {
                format: 'text/html',
                id: 'https://example.org',
                label: {en: ['Image homepage']},
                type: 'Text',
                language: ['en']
            },
            {
                format: 'text/html',
                id: 'https://example.org/de',
                label: {de: ['Bild-Homepage']},
                type: 'Text',
                language: ['de']
            }
        ] as any
    );

    return manifest;
}

const severalHomepagesWithUnsupportedLanguages = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Homepage with unsupported languages', undefined,
        undefined, images);
    manifest.setHomepage(
        [
            {
                format: 'text/html',
                id: 'https://example.org/xx',
                label: {xx: ['Homepage xx']},
                type: 'Text',
                language: ['xx']
            },
            {
                format: 'text/html',
                id: 'https://example.org/yy',
                label: {yy: ['Homepage yy']},
                type: 'Text',
                language: ['yy']
            }
        ] as any
    );

    return manifest;
}

const providerHomepage = (ctx: ParameterizedContext, prefix: string, path: string) => {

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
                body: homepage,
                images
            },
            {
                path: '/manifest/severalHomepages',
                body: severalHomepages,
                images
            },
            {
                path: '/manifest/severalHomepagesWithDifferentLanguages',
                body: severalHomepagesWithDifferentLanguages,
                images
            },
            {
                path: '/manifest/severalHomepagesWithUnsupportedLanguages',
                body: severalHomepagesWithUnsupportedLanguages,
                images
            },
            {
                path: '/manifest/homepage3',
                body: providerHomepage,
                images
            }
        ]
    }
]);
