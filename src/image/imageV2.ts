import * as Router from 'koa-router';
import {getAriel, getImage} from "./image";
import {transformCollectionToV2, transformManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});


router.get('/collection/image', ctx => {
    ctx.body = transformCollectionToV2(getImage(ctx, prefix));
});

router.get('/manifest/ariel', ctx => {
    ctx.body = transformManifestToV2(getAriel(ctx, prefix));
});

export default router.routes();
