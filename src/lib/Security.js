const DefaultAccessId = '4321';
const UserToken = '1234';
const ViewerToken = 'abcd';

function hasAccess(ctx) {

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


module.exports = {
    hasAccess,
    DefaultAccessId,
    UserToken,
    ViewerToken
};