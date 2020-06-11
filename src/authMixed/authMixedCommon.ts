import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import {cookieName, cookieToken, getAuthLoginService, viewerToken} from "../authLogin/authLoginCommon";
import {
    cookieName as cookieNameClickThrough,
    cookieToken as cookieTokenClickThrough,
    viewerToken as viewerTokenClickThrough,
    getAuthClickThroughService
} from "../authClickThrough/authClickThroughCommon";
import {hasAccess} from "../lib/Security";
import RootCollection from "../lib/RootCollection";

export function getAuthMixed(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authMixed';
    const c = new RootCollection(url, 'Open Collection');
    c.setItems([
        getAuthMixedLogin(ctx, prefix, true),
        getAuthMixedClickThrough(ctx, prefix, true)
    ]);
    return c;
}

export function getAuthMixedLogin(ctx: ParameterizedContext, prefix: string, isChild?: boolean) {

    let label = 'Subfolder with login access restriction';
    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        label = 'Access denied';
        if (isChild !== true) {
            ctx.status = 401;
        }
    }

    const url = ctx.request.origin + prefix + '/collection/authMixedLogin';
    const c = new RootCollection(url, label);
    c.setService(getAuthLoginService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authMixed', 'Collection');

    return c;
}

export function getAuthMixedClickThrough(ctx: ParameterizedContext, prefix: string, isChild?: boolean) {
    const url = ctx.request.origin + prefix + '/collection/authMixedClickThrough';
    const c = new RootCollection(url, 'Subfolder with click though access restriction');
    c.setService(getAuthClickThroughService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authMixed', 'Collection');

    if (!hasAccess(ctx, cookieNameClickThrough, cookieTokenClickThrough, viewerTokenClickThrough)) {
        if (isChild !== true) {
            ctx.status = 401;
        }
        c.setLabel( 'Access denied');
    }

    return c;
}
