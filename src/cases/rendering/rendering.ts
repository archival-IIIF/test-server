import {ParameterizedContext} from "koa";
import {getIIIFRouteTree} from "../../lib/Route";
import ImageManifest from "../../lib/ImageManifest";


const providerManifest = (ctx: ParameterizedContext, prefix: string, path: string) => {

    const manifest = new ImageManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + prefix + path.replace('/manifest/', '/image/') + '_0',
    'Image with provider information',
        1,
        1,
    );

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
