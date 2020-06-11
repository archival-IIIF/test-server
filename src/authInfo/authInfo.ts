import * as Router from 'koa-router';
import authInfoV2 from "./authInfoV2";
import authLoginV3 from "../authLogin/authLoginV3";
import authInfoImageService from "./authInfoImageService";

const router: Router = new Router();

router.use(authInfoV2);
router.use(authLoginV3);
router.use(authInfoImageService);

export default router.routes();
