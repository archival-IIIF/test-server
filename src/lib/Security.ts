import * as Router from 'koa-router';

export const DefaultAccessId = '4321';
export const UserToken = '1234';
export const ViewerToken = 'abcd';

export function hasAccess(ctx: Router.RouterContext) {

    const accessId = ctx.cookies.get('access');
    if (accessId === DefaultAccessId) {
        return true;
    }

    if (ctx.headers.hasOwnProperty('authorization')) {
        const accessToken = ctx.headers.authorization.replace('Bearer', '').trim();
        if (accessToken === ViewerToken) {
            return true;
        }
    }

    return false;
}

export default {hasAccess, DefaultAccessId, UserToken, ViewerToken};
