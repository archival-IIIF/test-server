import * as path from 'node:path';
import {createReadStream} from 'node:fs';
import {hasAccess} from '../lib/Security';
import moment from 'moment';
import type {ParameterizedContext} from "koa";

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

/**
 * Returns the origin (scheme://host[:port]) of an http(s) URL, or undefined for anything else.
 */
function normalizeOrigin(value: string | string[]): string | undefined {
    const raw = Array.isArray(value) ? value[0] : value;
    try {
        const url = new URL(raw);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            return undefined;
        }
        return url.origin;
    } catch (_err) {
        return undefined;
    }
}

/**
 * Serializes a value for safe embedding inside an inline <script> block.
 */
function toScriptLiteral(value: unknown): string {
    return JSON.stringify(value)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026');
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
        const origin = normalizeOrigin(ctx.query.origin);
        if (!origin) {
            ctx.throw(400, 'Invalid origin');
        }
        message.messageId = String(ctx.query.messageId);

        ctx.type = 'text/html';
        ctx.body = `<html>
            <body>
            <script>
                window.parent.postMessage(${toScriptLiteral(message)}, ${toScriptLiteral(origin)});
            </script>
            </body>
            </html>`;
    }
    else {
        ctx.body = message;
    }
}
