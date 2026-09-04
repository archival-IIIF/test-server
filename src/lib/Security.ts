import type {ParameterizedContext} from "koa";
import type {RouterContext} from "@koa/router";

export function hasAccess(
    ctx: RouterContext | ParameterizedContext,
    cookieName?: string,
    cookieToken?: string,
    viewerToken?: string) {

    if (cookieName) {
        const cookieValue = ctx.cookies.get(cookieName);
        if (cookieToken && cookieValue === cookieToken) {
            return true;
        }
    }



    if (Object.hasOwn(ctx.headers, 'authorization')) {
        const headerToken = ctx.headers.authorization?.replace('Bearer', '').trim();

        if (headerToken === viewerToken) {
            return true;
        }
    }

    return false;
}
