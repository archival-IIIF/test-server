import * as Router from 'koa-router';
import {
    getLanguage,
    getLanguageFile1,
    getLanguageFile2,
    getLanguageFile3,
    getLanguageFile4,
    getLanguageFile5
} from "./language";
import {transformCollectionToV2, transformFileManifestToV2} from "../../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/language', ctx => {
    ctx.body = transformCollectionToV2(getLanguage(ctx, prefix));
});

router.get('/manifest/languageFile1', ctx => {
    ctx.body = transformFileManifestToV2(getLanguageFile1(ctx, prefix));
});

router.get('/manifest/languageFile2', ctx => {
    ctx.body = transformFileManifestToV2(getLanguageFile2(ctx, prefix));
});

router.get('/manifest/languageFile3', ctx => {
    ctx.body = transformFileManifestToV2(getLanguageFile3(ctx, prefix));
});

router.get('/manifest/languageFile4', ctx => {
    ctx.body = transformFileManifestToV2(getLanguageFile4(ctx, prefix));
});

router.get('/manifest/languageFile5', ctx => {
    ctx.body = transformFileManifestToV2(getLanguageFile5(ctx, prefix));
});

export default router.routes();

