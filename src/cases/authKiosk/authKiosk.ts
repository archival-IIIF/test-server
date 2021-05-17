import {ParameterizedContext} from "koa";
import {cookieName, cookieToken, getAuthKioskService, viewerToken} from "../../auth/kiosk";
import {getCollectionBody, getIIIFRouteTree, getImageBody} from "../../lib/Route";

export default getIIIFRouteTree([
    {
        path: '/collection/authKiosk',
        body: getCollectionBody,
        label: 'Collection with access restriction',
        children: [{
            path: '/manifest/authKioskImage',
            label: 'Ariel_-_LoC_4a15521_dark.jpg',
            body: getImageBody,
            images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521_dark.jpg'],
            cookieName,
            cookieToken,
            viewerToken,
            authService: (ctx: ParameterizedContext) => getAuthKioskService(ctx)
        }]
    }
]);
