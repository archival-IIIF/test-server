import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";
import {cookieName, cookieToken, getAuthLoginService, viewerToken} from "../../auth/login";
import {cookieName as cookieNameClickThrough, cookieToken as cookieTokenClickThrough,
    viewerToken as viewerTokenClickThrough, getAuthClickThroughService} from "../../auth/clickThrough";
import {ParameterizedContext} from "koa";

export default getIIIFRouteTree([
    {
        path: '/collection/authMixed',
        body: getCollectionBody,
        label: 'Collection with access restriction',
        children: [
            {
                path: '/collection/authMixedLogin',
                label: 'Subfolder with login access restriction',
                body: getCollectionBody,
                cookieName,
                cookieToken,
                viewerToken,
                authService: (ctx: ParameterizedContext) => getAuthLoginService(ctx)
            },
            {
                path: '/collection/authMixedClickThrough',
                label: 'Subfolder with click though access restriction',
                body: getCollectionBody,
                cookieName: cookieNameClickThrough,
                cookieToken: cookieTokenClickThrough,
                viewerToken: viewerTokenClickThrough,
                authService: (ctx: ParameterizedContext) => getAuthClickThroughService(ctx)
            }
        ]
    }
]);
