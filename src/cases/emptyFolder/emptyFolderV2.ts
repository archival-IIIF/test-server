import * as Router from 'koa-router';
import {getEmptyFolder, getEmptyFolderContainer} from "./emptyFolder";
import {transformCollectionToV2} from "../../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});


router.get('/collection/emptyFolder', ctx => {
    ctx.body = transformCollectionToV2(getEmptyFolderContainer(ctx, prefix));
});

router.get('/collection/emptyFolder2', ctx => {
    ctx.body = transformCollectionToV2(getEmptyFolder(ctx, prefix));
});

export default router.routes();
