import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import {getAuthLoginService} from "../authLogin/authLogin";
import Manifest from "../presentation-builder/v3/Manifest";
import Resource from "../presentation-builder/v3/Resource";
import {hasAccess} from "../lib/Security";
import RootCollection from "../lib/RootCollection";

export function getAuthLoginPartly(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLoginPartly';
    const c = new RootCollection(url, 'Open Collection');
    c.setItems([
        getAuthLoginPartly1(ctx, prefix),
        getAuthLoginPartly2(ctx, prefix)
    ]);
    return c;
}


export function getAuthLoginPartly1(ctx: ParameterizedContext, prefix: string) {

    let label = 'Subfolder with access restriction';
    if (!hasAccess(ctx)) {
        label = 'Access denied';
    }

    const url = ctx.request.origin + prefix + '/collection/authLoginPartly1';
    const c = new RootCollection(url, label);
    c.setService(getAuthLoginService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authLoginPartly', 'Collection');

    return c;
}

export function getAuthLoginPartly2(ctx: ParameterizedContext, prefix: string) {

    const hasAccess0 = hasAccess(ctx);

    let label = 'File with access restriction';
    if (!hasAccess0) {
        label = 'Access denied';
    }

    const url = ctx.request.origin + prefix + '/manifest/authLoginPartly2';
    const m = new Manifest(url, label);
    m.setService(getAuthLoginService(ctx));
    m.setParent(ctx.request.origin + prefix + '/collection/authLoginPartly', 'Collection');
    if (hasAccess0) {
        m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));
    }

    return m;
}
