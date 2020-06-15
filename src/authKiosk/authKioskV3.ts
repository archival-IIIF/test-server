import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
import {getAuthKiosk, getAuthKioskImage} from "./authKioskCommon";

router.get('/collection/authKiosk', ctx => {
    ctx.body = getAuthKiosk(ctx, prefix);
});

router.get('/manifest/authKioskImage', ctx => {
    ctx.body = getAuthKioskImage(ctx, prefix);
});

export default router.routes();
