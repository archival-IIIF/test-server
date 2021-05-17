import * as Router from 'koa-router';
import {hasAccess} from '../lib/Security';
import {responseFile} from "../imageService/imageService";
import {cookieName, cookieToken, viewerToken, getAuthLoginService} from "../auth/login";
import {infoV2} from "../imageService/imageBase";


const imageWith = 1840;
const imageHeight = 1450;
const router: Router = new Router();


router.get('/image-service/v2/authInfo/info.json', ctx => {
    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        ctx.status = 401;
    }

    const output: any = infoV2(ctx.request.origin + '/image-service/v2/authInfo', imageWith, imageHeight);
    output.service = [getAuthLoginService(ctx)];

    ctx.body = output;
});

router.get('/image-service/v2/authInfo/:region/:size/:rotation/:quality.:format', async ctx => {

    if (!hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
        ctx.status = 401;
        return;
    }

    await responseFile(ctx, __dirname + '/../imageService/Ariel_-_LoC_4a15521_dark.jpg', imageWith, imageHeight);
});


export default router.routes();

