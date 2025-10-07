import Router from '@koa/router';
import authInfoV2 from "./authInfoV2";
import authInfoV3 from "./authInfoV3";
import authInfoImageService from "./authInfoImageService";

const router: Router = new Router();

router.use(authInfoV2);
router.use(authInfoV3);
router.use(authInfoImageService);

export default router.routes();
