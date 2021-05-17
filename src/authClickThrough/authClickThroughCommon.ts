import {ParameterizedContext} from "koa";
import RootCollection from "../lib/RootCollection";
import {hasAccess} from "../lib/Security";
import {getArielManifestChild} from "../imageService/imageBase";
import {getAuthClickThroughService} from "../auth/clickThrough";

export const cookieName = 'access-click-through';
export const cookieToken = 'click-through-cookie-abc';
export const viewerToken = 'click-through-viewer-123';

export function getAuthClickThrough(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/authClickThrough';
    const c = new RootCollection(url, 'Collection with access restriction');

    c.setService(getAuthClickThroughService(ctx));
    c.setItems([
        getArielManifestChild(ctx, prefix, 'authClickThroughImage'),
    ]);

    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        ctx.status = 401;
    }

    return c;
}
