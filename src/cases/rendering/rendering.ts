import {ParameterizedContext} from "koa";
import {getIIIFRouteTree, getImageBody2} from "../../lib/Route";

const images = [
    __dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg',
];

const providerManifest = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody2(ctx, prefix, path, 'Image with rendering', undefined, images);
    manifest.setRendering([{
        id: "https://example.org/iiif/book1.pdf",
        type: "Text",
        label: { en: [ "Download as PDF" ], de: ["Als PDF herunterladen"] },
        format: "application/pdf"
    }]);

    return manifest;
}



export default getIIIFRouteTree([
    {
        path: '/manifest/rendering',
        body: providerManifest,
        images: [
            __dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg',
        ]
    }
]);
