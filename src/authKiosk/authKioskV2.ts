import * as Router from 'koa-router';
import {
    getAuthKiosk,
    getAuthKioskSubFolder,
} from "./authKioskCommon";
import {transformCollectionToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authKiosk', ctx => {
    ctx.body = transformCollectionToV2(getAuthKiosk(ctx, prefix));
});

router.get('/collection/authKioskSubfolder', ctx => {
    ctx.body = transformCollectionToV2( getAuthKioskSubFolder(ctx, prefix));
});

export default router.routes();
