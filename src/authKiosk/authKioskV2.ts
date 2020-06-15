import * as Router from 'koa-router';
import {
    getAuthKiosk,
    getAuthKioskImage,
} from "./authKioskCommon";
import {transformCollectionToV2, transformImageManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authKiosk', ctx => {
    ctx.body = transformCollectionToV2(getAuthKiosk(ctx, prefix));
});

router.get('/manifest/authKioskImage', ctx => {
    ctx.body = transformImageManifestToV2( getAuthKioskImage(ctx, prefix));
});

export default router.routes();
