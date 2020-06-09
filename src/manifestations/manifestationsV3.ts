import * as Router from 'koa-router';
import {getManifestations, getManifestation} from "./manifestations";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/manifestations', ctx => {
    ctx.body = getManifestations(ctx, prefix);
});

router.get('/manifest/manifestation', ctx => {
    ctx.body = getManifestation(ctx, prefix);
});

export default router.routes();
