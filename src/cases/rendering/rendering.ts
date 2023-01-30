import {ParameterizedContext} from "koa";
import {getIIIFRouteTree, getImageBody} from "../../lib/Route";

const images = [
    __dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg',
];

const providerManifest = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = getImageBody(ctx, prefix, path, 'Image with rendering', undefined, undefined, images);
    manifest.setRendering([{
        id: "https://example.org/book1.pdf",
        type: "Text",
        label: { en: [ "Download as PDF" ], de: ["Als PDF herunterladen"] },
        format: "application/pdf"
    }]);
    manifest.setRendering([{
        id: "https://example.org/book2.pdf",
        type: "Text",
        label: { en: [ "Download as PDF-A" ]},
        format: "application/pdf"
    }]);
    manifest.setRendering([{
        id: "https://example.org/book3.pdf",
        type: "Text",
        label: {de: ["Als PDF herunterladen"] },
        format: "application/pdf"
    }]);

    return manifest;
}



export default getIIIFRouteTree([
    {
        path: '/manifest/rendering',
        body: providerManifest,
        images
    }
]);
