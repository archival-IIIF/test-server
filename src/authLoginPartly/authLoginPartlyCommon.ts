import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import {getAuthLoginService, viewerToken} from "../authLogin/authLoginCommon";
import {hasAccess} from "../lib/Security";
import RootCollection from "../lib/RootCollection";
import {getArielManifestChild} from "../imageService/imageBase";

export function getAuthLoginPartly(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authLoginPartly';
    const c = new RootCollection(url, 'Open Collection');
    c.setItems([
        getAuthLoginPartly1(ctx, prefix, true),
        getArielManifestChild(ctx, prefix, 'authLoginPartly2')
    ]);
    return c;
}

export function getAuthLoginPartly1(ctx: ParameterizedContext, prefix: string, isChild?: boolean) {

    if (!hasAccess(ctx, undefined, undefined, viewerToken)) {
        if (isChild !== true) {
            ctx.status = 401;
        }
    }

    const url = ctx.request.origin + prefix + '/collection/authLoginPartly1';
    const c = new RootCollection(url, 'Subfolder with access restriction');
    c.setService(getAuthLoginService(ctx));
    c.setParent(ctx.request.origin + prefix + '/collection/authLoginPartly', 'Collection');

    return c;
}

