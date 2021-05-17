import {cookieName, cookieToken, viewerToken, getAuthLoginService} from "../../auth/login";
import {ParameterizedContext} from "koa";
import {getCollectionBody, getIIIFRouteTree, iRoute,} from "../../lib/Route";
import RootCollection from "../../lib/RootCollection";
import {hasAccess} from "../../lib/Security";


const getCollectionBody2 = (ctx: ParameterizedContext, prefix: string, path: string, label: string | undefined,
    route: iRoute): RootCollection =>
{
    const c = getCollectionBody(ctx, prefix, path, label, route);
    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken,)) {
        c.setLabel('Access denied');
    }

    return c;
}


export default getIIIFRouteTree([
    {
        path: '/collection/authLoginRestrictedLabels2',
        body: getCollectionBody,
        label: 'Collection with access restriction',
        children: [{
            path: '/collection/authLoginRestrictedLabels2Subfolder',
            label: 'Subfolder with access restriction',
            body: getCollectionBody2,
            cookieName,
            cookieToken,
            viewerToken,
            authService: (ctx: ParameterizedContext) => getAuthLoginService(ctx)
        }]
    }
]);

