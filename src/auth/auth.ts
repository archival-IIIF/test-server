import * as path from 'path';
import {createReadStream} from 'fs';
import {hasAccess} from '../lib/Security';
import * as moment from 'moment';
import {ParameterizedContext} from "koa";

export function loginPage(ctx: ParameterizedContext, cookieName?: string, cookieToken?: string) {

    if (cookieName) {
        ctx.cookies.set(cookieName, cookieToken, {
            signed: true,
            maxAge: 86400000,
            expires: moment().add(1, 'd').toDate(),
            overwrite: true
        });
    }
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'close-window.html'));

}

export interface IMessage {
    accessToken?: string;
    expiresIn?: number;
    error?: string;
    description?: string;
    messageId?: string;

}


export function logoutPage(ctx: ParameterizedContext, cookieName: string) {
    ctx.cookies.set(cookieName);
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'logout.html'));
}

export function tokenPage(ctx: ParameterizedContext, cookieName: string, cookieToken: string, viewerToken: string) {
    const message: IMessage = {};

    if (hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        message.accessToken = viewerToken;
        message.expiresIn = 3600;
    } else {
        message.error = 'missingCredentials';
        message.description = 'No access cookie found!';
    }

    if (ctx.query.messageId && ctx.query.origin) {
        message.messageId = ctx.query.messageId as string;

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
}
