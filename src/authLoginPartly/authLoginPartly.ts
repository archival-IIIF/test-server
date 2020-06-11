import * as Router from 'koa-router';
import authLoginPartlyV2 from "./authLoginPartlyV2";
import authLoginPartlyV3 from "./authLoginPartlyV3";

const router: Router = new Router();

router.use(authLoginPartlyV2);
router.use(authLoginPartlyV3);

export default router.routes();
