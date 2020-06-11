import * as Router from 'koa-router';
import {hasAccess} from '../lib/Security';
import {getAuthLogin, getAuthLoginSubFolder} from "./authLogin";
import {transformCollectionToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/authLogin', ctx => {
    let collectionManifest = getAuthLogin(ctx, prefix);

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        collectionManifest.setLabel('Access denied');
        collectionManifest.setItems([]);
    }

    ctx.body = transformCollectionToV2(collectionManifest);
});

router.get('/collection/authLoginSubfolder', ctx => {

    let collectionManifest = getAuthLoginSubFolder(ctx, prefix);

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        collectionManifest.setLabel( 'Access denied');
        ctx.body = collectionManifest;
        return;
    }

    ctx.body = transformCollectionToV2(collectionManifest);
});

export default router.routes();
