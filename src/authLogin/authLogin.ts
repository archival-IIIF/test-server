import * as Router from 'koa-router';
import {
    cookieName,
    cookieToken,
    viewerToken,
    userToken,
    getAuthLoginService,
} from "./authLoginCommon";
import {createReadStream} from "fs";
import * as path from 'path';
import {ParameterizedContext} from "koa";
import {loginPage, logoutPage, tokenPage} from "../auth/auth";
import RootCollection from "../lib/RootCollection";
import {addCollectionRoute} from "../lib/Route";

const router: Router = new Router();


router.get('/login', (ctx: Router.RouterContext) => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'token-login.html'));
});

router.post('/login', async (ctx: ParameterizedContext) => {

    const request: any = ctx.request;
    const token = request.body.token;
    if (token === userToken) {
        loginPage(ctx, cookieName, cookieToken);
    } else {
        loginPage(ctx);
    }
});

router.get('/token', async (ctx: ParameterizedContext) => {
    tokenPage(ctx, cookieName, cookieToken, viewerToken);
});

router.get('/logout', async (ctx: ParameterizedContext) => {
    logoutPage(ctx, cookieName);
});


const subFolder = new RootCollection('/collection/authLoginSubfolder', 'Subfolder with access restriction');
subFolder.setService(getAuthLoginService());

const folder = new RootCollection('/collection/authLogin', 'Collection with access restriction');
folder.setService(getAuthLoginService());
folder.setItems([subFolder]);
subFolder.setParent(folder.id);

addCollectionRoute(router, folder, cookieName, cookieToken, viewerToken);
addCollectionRoute(router, subFolder, cookieName, cookieToken, viewerToken);

export default router.routes();
