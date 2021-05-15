import * as Router from 'koa-router';
import {getFileWithLogo, getFileWithoutLogo, getLogo} from "./logo";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/logo', ctx => {
    ctx.body = getLogo(ctx, prefix);
});

router.get('/manifest/fileWithLogo', ctx => {
    ctx.body = getFileWithLogo(ctx, prefix);
});

router.get('/manifest/fileWithoutLogo', ctx => {
    ctx.body = getFileWithoutLogo(ctx, prefix);
});

export default router.routes();
