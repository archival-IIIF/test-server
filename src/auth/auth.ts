import * as Router from 'koa-router';
import * as path from 'path';
import {createReadStream} from 'fs';


const moment = require('moment');
const {DefaultAccessId, hasAccess, UserToken, ViewerToken} = require('../lib/Security');

const router: Router = new Router();

router.get('/login', (ctx: Router.RouterContext) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'token-login.html'));
});

router.post('/login', async (ctx: Router.RouterContext) => {

    const token = ctx.body.token;
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

interface IMessage {
    accessToken?: string;
    expiresIn?: number;
    error?: string;
    description?: string;
    messageId?: string;

}

router.get('/token', async (ctx: Router.RouterContext) => {
    const message: IMessage = {};

    if (hasAccess(ctx)) {
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

router.get('/logout', async (ctx: Router.RouterContext) => {
    ctx.cookies.set('access');

    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'logout.html'));
});


export default router.routes();
