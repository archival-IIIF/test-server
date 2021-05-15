import * as Router from 'koa-router';
import {
    getThumbnail,
    getFolderWithThumbnail,
    getFolderWithoutThumbnail,
    getFolderWithThumbnailService,
    getFileWithoutThumbnail
} from "./thumbnail";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/thumbnail', ctx => {
    ctx.body = getThumbnail(ctx, prefix);
});

router.get('/collection/folderWithThumbnail', ctx => {
    ctx.body = getFolderWithThumbnail(ctx, prefix);
});

router.get('/collection/folderWithoutThumbnail', ctx => {
    ctx.body = getFolderWithoutThumbnail(ctx, prefix);
});

router.get('/collection/folderWithThumbnailService', ctx => {
    ctx.body = getFolderWithThumbnailService(ctx, prefix);
});


router.get('/manifest/fileWithoutThumbnail', ctx => {
    ctx.body = getFileWithoutThumbnail(ctx, prefix);
});


export default router.routes();

