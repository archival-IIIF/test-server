const AccessState = Object.freeze({
    OPEN: Symbol('open'),
    CLOSED: Symbol('closed')
});

const DefaultAccessId = '4321';
const UserToken = '1234';
const ViewerToken = 'abcd';

function hasAccess(ctx) {

    const accessId = ctx.cookies.get('access');
    if (accessId === DefaultAccessId) {
        return {state: AccessState.OPEN};
    }

    if (ctx.headers.hasOwnProperty('authorization')) {
        const accessToken = ctx.headers.authorization.replace('Bearer', '').trim();
        if (accessToken === ViewerToken) {
            return {state: AccessState.OPEN};
        }
    }

    return {state: AccessState.CLOSED};
}


module.exports = {
    AccessState,
    hasAccess,
    DefaultAccessId,
    UserToken,
    ViewerToken
};