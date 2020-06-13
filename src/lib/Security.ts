import * as Router from 'koa-router';
import {ParameterizedContext} from "koa";

export function hasAccess(
    ctx: Router.RouterContext | ParameterizedContext,
    cookieName?: string,
    cookieToken?: string,
    viewerToken?: string) {

    let cookieValue = ctx.cookies.get(cookieName);
    if (cookieToken && cookieValue === cookieToken) {
        return true;
    }


    if (ctx.headers.hasOwnProperty('authorization')) {
        const headerToken = ctx.headers.authorization.replace('Bearer', '').trim();

        if (headerToken === viewerToken) {
            return true;
        }
    }

    return false;
}
