import * as Router from 'koa-router';
import {getManifestations, getManifestation} from "./manifestations";
import {transformCollectionToV2, transformFileManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/manifestations', ctx => {
    ctx.body = transformCollectionToV2(getManifestations(ctx, prefix));
});

router.get('/manifest/manifestation', ctx => {
    ctx.body = transformFileManifestToV2(getManifestation(ctx, prefix));
});

export default router.routes();
