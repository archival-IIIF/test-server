const {createReadStream} = require('fs');
const path = require('path');
const moment = require('moment');
const Router = require('koa-router');
const {DefaultAccessId, AccessState, hasAccess, UserToken, ViewerToken} = require('../lib/Security');

const router = new Router();

router.get('/login', ctx => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'token-login.html'));
});

router.post('/login', async ctx => {

    const token = ctx.request.body.token;
    if (token === UserToken) {
        ctx.cookies.set('access', DefaultAccessId, {
            signed: true,
            maxAge: 86400000,
            expires: moment().add(1, 'd').toDate(),
            overwrite: true
        });
    }
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'close-window.html'));
});

router.get('/token', async ctx => {
    const message = {};

    const access = hasAccess(ctx);
    if (access.state === AccessState.OPEN) {
        message.accessToken = ViewerToken;
        message.expiresIn = 3600;
    }
    else {
        message.error = 'missingCredentials';
        message.description = 'No access cookie found!';
    }

    if (ctx.query.messageId && ctx.query.origin) {
        message.messageId = ctx.query.messageId;

        ctx.body = `<html>
            <body>
            <script>    
                window.parent.postMessage(${JSON.stringify(message)}, "${ctx.query.origin}");    
            </script>
            </body>
            </html>`;
    }
    else {
        ctx.body = message;
    }
});

router.get('/logout', async ctx => {
    ctx.cookies.set('access');

    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'logout.html'));
});


module.exports = router;
