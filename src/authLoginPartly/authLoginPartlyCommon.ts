import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import {cookieName, cookieToken, getAuthLoginService, viewerToken} from "../authLogin/authLoginCommon";
import Resource from "../presentation-builder/v3/Resource";
import {hasAccess} from "../lib/Security";
import RootCollection from "../lib/RootCollection";
import RootManifest from "../lib/RootManifest";

export function getAuthLoginPartly(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLoginPartly';
    const c = new RootCollection(url, 'Open Collection');
    c.setItems([
        getAuthLoginPartly1(ctx, prefix, true),
        getAuthLoginPartly2(ctx, prefix, true)
    ]);
    return c;
}

export function getAuthLoginPartly1(ctx: ParameterizedContext, prefix: string, isChild?: boolean) {

    let label = 'Subfolder with access restriction';
    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        label = 'Access denied';
        if (isChild !== true) {
            ctx.status = 401;
        }
    }

    const url = ctx.request.origin + prefix + '/collection/authLoginPartly1';
    const c = new RootCollection(url, label);
    c.setService(getAuthLoginService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authLoginPartly', 'Collection');

    return c;
}

export function getAuthLoginPartly2(ctx: ParameterizedContext, prefix: string, isChild?: boolean) {

    const hasAccess0 = hasAccess(ctx, cookieName, cookieToken, viewerToken);

    let label = 'File with access restriction';
    if (!hasAccess0) {
        label = 'Access denied';
        if (isChild !== true) {
            ctx.status = 401;
        }
    }

    const url = ctx.request.origin + prefix + '/manifest/authLoginPartly2';
    const m = new RootManifest(url, label);
    m.setService(getAuthLoginService(ctx));
    m.setParent(ctx.request.origin + prefix + '/collection/authLoginPartly', 'Collection');
    if (hasAccess0) {
        m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));
    }

    return m;
}
