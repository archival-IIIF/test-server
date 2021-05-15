import * as Router from 'koa-router';
import {
    getLanguage,
    getLanguageFile1,
    getLanguageFile2,
    getLanguageFile3,
    getLanguageFile4,
    getLanguageFile5
} from "./language";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/language', ctx => {
    ctx.body = getLanguage(ctx, prefix);
});

router.get('/manifest/languageFile1', ctx => {
    ctx.body = getLanguageFile1(ctx, prefix);
});

router.get('/manifest/languageFile2', ctx => {
    ctx.body = getLanguageFile2(ctx, prefix);
});

router.get('/manifest/languageFile3', ctx => {
    ctx.body = getLanguageFile3(ctx, prefix);
});

router.get('/manifest/languageFile4', ctx => {
    ctx.body = getLanguageFile4(ctx, prefix);
});

router.get('/manifest/languageFile5', ctx => {
    ctx.body = getLanguageFile5(ctx, prefix);
});

export default router.routes();

