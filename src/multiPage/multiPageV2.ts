import * as Router from 'koa-router';
import {transformCollectionToV2, transformManifestToV2} from "../lib/Transform";
import {getMultiPage, getMultiPage1} from "./multiPage";

const router: Router = new Router();


router.get('/collection/multiPage', ctx => {

   const c = getMultiPage(ctx, '');
   ctx.body = transformCollectionToV2(c);
});

router.get('/manifest/multiPage1', ctx => {
   const m = getMultiPage1(ctx, '');
   ctx.body = transformManifestToV2(m);
});

export default router.routes();
