import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
import {getAuthKiosk, getAuthKioskSubFolder} from "./authKioskCommon";

router.get('/collection/authKiosk', ctx => {
    ctx.body = getAuthKiosk(ctx, prefix);
});

router.get('/collection/authKioskSubfolder', ctx => {
    ctx.body = getAuthKioskSubFolder(ctx, prefix);
});

export default router.routes();
