import {ParameterizedContext} from "koa";
import RootCollection from "../../lib/RootCollection";
import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import Collection from "../../presentation-builder/v3/Collection";

const imageContainer = (ctx: ParameterizedContext, prefix: string, path: string): Collection =>
    new RootCollection(
        ctx.request.origin + prefix + path,
        'Image test case'
    );

export default getIIIFRouteTree([
    {
        path: '/collection/image',
        body: imageContainer,
        children: [
            {
                path: '/manifest/image1',
                body: getImageBody,
                label: 'Ariel_-_LoC_4a15521.jpg',
                images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg']
            },
            {
                path: '/manifest/image2',
                label: 'Ariel_-_LoC_4a15521_dark.jpg',
                body: getImageBody,
                images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521_dark.jpg']
            }
        ]
    }
]);
