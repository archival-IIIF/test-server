import Router from '@koa/router';
import {ParameterizedContext} from "koa";

export default function getBaseUrl(ctx: Router.RouterContext | ParameterizedContext): string {
    if (ctx.headers['x-forwarded-host']) {

        let protocol = 'http';
        if (ctx.headers['x-forwarded-proto']) {
            protocol = ctx.headers['x-forwarded-proto'].toString();
        }

        return protocol + '://' + ctx.headers['x-forwarded-host'];
    }

    return ctx.request.origin;
}

