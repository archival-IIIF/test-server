import * as Router from 'koa-router';
import {getAuthLoginPartly, getAuthLoginPartly1} from "./authLoginPartlyCommon";
import {addArialRoute} from "../imageService/imageBase";
import {cookieName, cookieToken, getAuthLoginService, viewerToken} from "../authLogin/authLoginCommon";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/authLoginPartly', ctx => {
    ctx.body = getAuthLoginPartly(ctx, prefix);
});

router.get('/collection/authLoginPartly1', ctx => {
    ctx.body = getAuthLoginPartly1(ctx, prefix);
});

export default router.routes();

