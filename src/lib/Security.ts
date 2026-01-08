import {ParameterizedContext} from "koa";
import {RouterContext} from "@koa/router";

export function hasAccess(
    ctx: RouterContext | ParameterizedContext,
    cookieName?: string,
    cookieToken?: string,
    viewerToken?: string) {

    if (cookieName) {
        let cookieValue = ctx.cookies.get(cookieName);
        if (cookieToken && cookieValue === cookieToken) {
            return true;
        }
    }



    if (ctx.headers.hasOwnProperty('authorization')) {
        const headerToken = ctx.headers.authorization?.replace('Bearer', '').trim();

        if (headerToken === viewerToken) {
            return true;
        }
    }

    return false;
}
