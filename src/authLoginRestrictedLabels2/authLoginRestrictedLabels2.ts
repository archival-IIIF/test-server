import * as Router from 'koa-router';
import {
    cookieName,
    cookieToken,
    viewerToken,
    getAuthLoginService,
} from "../authLogin/authLoginCommon";
import {ParameterizedContext} from "koa";
import RootCollection from "../lib/RootCollection";
import {addCollectionRoute} from "../lib/Route";
import Collection from "../presentation-builder/v3/Collection";

const router: Router = new Router();

const subFolder = new RootCollection('/collection/authLoginRestrictedLabels2Subfolder', 'Subfolder with access restriction');
subFolder.setService(getAuthLoginService());

const folder = new RootCollection('/collection/authLoginRestrictedLabels2', 'Collection with access restriction');
folder.setService(getAuthLoginService());
folder.setItems([subFolder]);
subFolder.setParent(folder.id);

const changeFunc = function(ctx: ParameterizedContext, collection: Collection, hasAccess0: boolean) {
    if (!hasAccess0) {
        collection.setLabel('Access denied');
    }
}

addCollectionRoute(router, folder, cookieName, cookieToken, viewerToken, changeFunc);
addCollectionRoute(router, subFolder, cookieName, cookieToken, viewerToken);

export default router.routes();
