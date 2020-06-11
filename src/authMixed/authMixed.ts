import * as Router from 'koa-router';
import authMixedV2 from "./authMixedV2";
import authMixedV3 from "./authMixedV3";

const router: Router = new Router();

router.use(authMixedV2);
router.use(authMixedV3);

export default router.routes();
