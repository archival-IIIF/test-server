import * as Router from 'koa-router';
import {getDocx, getPdf, getPdf1, getPdfa} from "./pdf";
import {transformCollectionToV2, transformFileManifestToV2} from "../../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});


router.get('/collection/pdf', ctx => {
    ctx.body = transformCollectionToV2(getPdf(ctx, prefix));
});


router.get('/manifest/pdf1', ctx => {
    ctx.body = transformFileManifestToV2(getPdf1(ctx, prefix));
});

router.get('/manifest/docx', ctx => {
    ctx.body = transformFileManifestToV2(getDocx(ctx, prefix));
});

router.get('/manifest/pdfa', ctx => {
    ctx.body = transformFileManifestToV2(getPdfa(ctx, prefix));
});


export default router.routes();
