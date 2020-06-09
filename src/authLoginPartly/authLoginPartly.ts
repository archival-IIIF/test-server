import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import CollectionItem from "../lib/CollectionItem";
import AuthService from "../presentation-builder/v3/AuthService";
import {getAuthService} from "../authLogin/authLogin";
import Manifest from "../presentation-builder/v3/Manifest";
import Resource from "../presentation-builder/v3/Resource";
import {hasAccess} from "../lib/Security";

export function getAuthLoginPartly(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLoginPartly';
    const c = new Collection(url, 'Open Collection');
    c.setContext('http://iiif.io/api/presentation/3/context.json');
    c.setItems([
        new CollectionItem(getAuthLoginPartly1(ctx, prefix)),
        new CollectionItem(getAuthLoginPartly2(ctx, prefix))
    ]);
    return c;
}


export function getAuthLoginPartly1(ctx: ParameterizedContext, prefix: string) {

    let label = 'Subfolder with access restriction';
    if (!hasAccess(ctx)) {
        label = 'Access denied';
    }

    const url = ctx.request.origin + prefix + '/collection/authLoginPartly1';
    const c = new Collection(url, label);
    c.setContext('http://iiif.io/api/presentation/3/context.json');
    c.setService(getAuthService(ctx));
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
    m.setService(getAuthService(ctx));
    m.setParent(ctx.request.origin + prefix + '/collection/authLoginPartly', 'Collection');
    if (hasAccess0) {
        m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));
    }

    return m;
}
