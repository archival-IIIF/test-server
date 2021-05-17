import {
    cookieName,
    cookieToken,
    viewerToken,
    getAuthLoginService,
} from "../../auth/login";
import {ParameterizedContext} from "koa";
import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";


export default getIIIFRouteTree([
    {
        path: '/collection/authLogin',
        body: getCollectionBody,
        label: 'Collection with access restriction',
        children: [{
            path: '/collection/authLoginSubfolder',
            label: 'Subfolder with access restriction',
            body: getCollectionBody,
            cookieName,
            cookieToken,
            viewerToken,
            authService: (ctx: ParameterizedContext) => getAuthLoginService(ctx)
        }]
    }
]);
