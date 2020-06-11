import * as Router from 'koa-router';
import {ParameterizedContext} from "koa";

export const DefaultAccessId = '4321';
export const UserToken = '1234';
export const ViewerToken = 'abcd';

export function hasAccess(
    ctx: Router.RouterContext | ParameterizedContext,
    cookieName?: string,
    cookieToken?: string,
    viewerToken?: string) {

    if (!cookieName) {
        cookieName = 'access';
    }

    if (!cookieToken) {
        cookieToken = DefaultAccessId;
    }

    let cookieValue = ctx.cookies.get(cookieName);
    if (cookieValue === cookieToken) {
        return true;
    }

    if (!viewerToken) {
        viewerToken = ViewerToken;
    }


    if (ctx.headers.hasOwnProperty('authorization')) {
        const headerToken = ctx.headers.authorization.replace('Bearer', '').trim();

        if (headerToken === viewerToken) {
            return true;
        }
    }

    return false;
}
