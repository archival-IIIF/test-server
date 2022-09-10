import {ParameterizedContext} from "koa";
import RootCollection from "../../lib/RootCollection";
import {hasAccess} from "../../lib/Security";
import {getAuthLoginService} from "../../auth/login";

export const cookieName = 'access';
export const cookieToken = '4321';
export const viewerToken = 'abcd';
export const userToken = '1234';

export function getAuthLogin(ctx: ParameterizedContext, prefix: string): RootCollection | void {
    const url = ctx.request.origin + prefix + '/collection/authLoginRestrictedLabels';


    if (!hasAccess(ctx, undefined, undefined, viewerToken)) {
        ctx.status = 302;
        ctx.redirect(url + '_degraded');
        return;
    }

    const c = new RootCollection(url, 'Collection with access restriction');
    c.setItems([
        getAuthLoginSubFolder(ctx, prefix, true),
    ]);
    c.setService(getAuthLoginService(ctx));

    return c;
}

export function getAuthLoginDegraded(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLoginRestrictedLabels_degraded';
    const c = new RootCollection(url, 'Access denied');

    c.setService(getAuthLoginService(ctx));

    return c;
}

export function getAuthLoginSubFolder(ctx: ParameterizedContext, prefix: string, isChild?: boolean) {
    const url = ctx.request.origin + prefix + '/collection/authLoginRestrictedLabelsSubfolder';
    const c = new RootCollection(url, 'Subfolder with access restriction');
    c.setService(getAuthLoginService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authLoginRestrictedLabels', 'Collection');

    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        if (isChild !== true) {
            ctx.status = 401;
        }
        c.setLabel( 'Access denied');
    }

    return c;
}

