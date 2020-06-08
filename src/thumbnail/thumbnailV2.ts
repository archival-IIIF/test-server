import * as Router from 'koa-router';
import {
    getThumbnail,
    getFolderWithThumbnail,
    getFolderWithoutThumbnail,
    getFolderWithThumbnailService,
    getFileWithoutThumbnail
} from "./thumbnail";
import {transformCollectionToV2, transformFileManifestToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/thumbnail', ctx => {
    ctx.body = transformCollectionToV2(getThumbnail(ctx, prefix));
});

router.get('/collection/folderWithThumbnail', ctx => {
    ctx.body = transformCollectionToV2(getFolderWithThumbnail(ctx, prefix));
});

router.get('/collection/folderWithoutThumbnail', ctx => {
    ctx.body = transformCollectionToV2(getFolderWithoutThumbnail(ctx, prefix));
});

router.get('/collection/folderWithThumbnailService', ctx => {
    ctx.body = transformCollectionToV2(getFolderWithThumbnailService(ctx, prefix));
});


router.get('/manifest/fileWithoutThumbnail', ctx => {
    ctx.body = transformFileManifestToV2(getFileWithoutThumbnail(ctx, prefix));
});

export default router.routes();

