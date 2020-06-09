import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
import {hasAccess} from '../lib/Security';
import {getAuthLogin, getAuthLoginSubFolder} from "./authLogin";

router.get('/collection/authLogin', ctx => {
    let collectionManifest = getAuthLogin(ctx, prefix);

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        collectionManifest.setLabel('Access denied');
        collectionManifest.setItems([]);
    }

    ctx.body = collectionManifest;
});

router.get('/collection/authLoginSubfolder', ctx => {

    let collectionManifest = getAuthLoginSubFolder(ctx, prefix);

    if (!hasAccess(ctx)) {
        ctx.status = 401;
        collectionManifest.setLabel( 'Access denied');
        ctx.body = collectionManifest;
        return;
    }

    ctx.body = collectionManifest;
});

export default router.routes();
