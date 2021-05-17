import {getCollectionBody, getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {ParameterizedContext} from "koa";
import {
    cookieName,
    cookieToken,
    viewerToken
} from "../../authClickThrough/authClickThroughCommon";
import {getAuthClickThroughService} from "../../auth/clickThrough";


export default getIIIFRouteTree([
    {
        path: '/collection/authClickThrough',
        body: getCollectionBody,
        label: 'Collection with access restriction',
        children: [{
            path: '/manifest/clickThroughImage',
            label: 'Ariel_-_LoC_4a15521_dark.jpg',
            body: getImageBody,
            images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521_dark.jpg'],
            cookieName,
            cookieToken,
            viewerToken,
            authService: (ctx: ParameterizedContext) => getAuthClickThroughService(ctx)
        }]
    }
]);
