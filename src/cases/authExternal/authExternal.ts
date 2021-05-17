import {getCollectionBody, getIIIFRouteTree, getImageBody, iRoute} from "../../lib/Route";
import {ParameterizedContext} from "koa";
import {getAuthServiceAccept, getAuthServiceDeny, viewerToken, cookieName, cookieToken} from "../../auth/external";


export default getIIIFRouteTree([
    {
        path: '/collection/authExternalAccept',
        body: getCollectionBody,
        label: 'Collection with access restriction',
        children: [{
            path: '/manifest/authExternalAccept',
            label: 'Ariel_-_LoC_4a15521_dark.jpg',
            body: getImageBody,
            images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521_dark.jpg'],
            cookieName,
            cookieToken,
            viewerToken,
            noImageAuth: true,
            authService: (ctx: ParameterizedContext) => getAuthServiceAccept(ctx)
        }]
    },
    {
        path: '/collection/authExternalDeny',
        body: getCollectionBody,
        label: 'Collection with access restriction',
        children: [{
            path: '/manifest/authExternalDeny',
            label: 'Ariel_-_LoC_4a15521_dark.jpg',
            body: getImageBody,
            images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521_dark.jpg'],
            viewerToken,
            authService: (ctx: ParameterizedContext) => getAuthServiceDeny(ctx)
        }]
    },
]);



