import * as Router from 'koa-router';
import {getPdf, getPdf1, getDocx, getPdfa} from "./pdf";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/pdf', ctx => {
    ctx.body = getPdf(ctx, prefix);
});


router.get('/manifest/pdf1', ctx => {
   ctx.body = getPdf1(ctx, prefix);
});

router.get('/manifest/docx', ctx => {
    ctx.body = getDocx(ctx, prefix);
});

router.get('/manifest/pdfa', ctx => {
    ctx.body = getPdfa(ctx, prefix);
});

export default router.routes();
