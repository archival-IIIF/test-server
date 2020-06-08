import * as Router from 'koa-router';
import {getEmptyFolder, getEmptyFolderContainer} from "./emptyFolder";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/emptyFolder', ctx => {
    ctx.body = getEmptyFolderContainer(ctx, prefix);
});

router.get('/collection/emptyFolder2', ctx => {
    ctx.body = getEmptyFolder(ctx, prefix);
});

export default router.routes();
