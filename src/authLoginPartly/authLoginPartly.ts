import * as Router from 'koa-router';
import authLoginPartlyV2 from "./authLoginPartlyV2";
import authLoginPartlyV3 from "./authLoginPartlyV3";
import {addArielRoute} from "../imageService/imageBase";
import {cookieName, cookieToken, getAuthLoginService, viewerToken} from "../authLogin/authLoginCommon";

const router: Router = new Router();

router.use(authLoginPartlyV2);
router.use(authLoginPartlyV3);

addArielRoute(
    router,
    'authLoginPartly2',
    '/collection/authLoginPartly',
    getAuthLoginService,
    cookieName,
    cookieToken,
    viewerToken
);

export default router.routes();
