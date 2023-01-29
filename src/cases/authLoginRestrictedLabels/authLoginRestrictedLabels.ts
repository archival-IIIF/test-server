import Router from 'koa-router';
import authLoginRestrictedLabelsV2 from "./authLoginRestrictedLabelsV2";
import authLoginRestrictedLabelsV3 from "./authLoginRestrictedLabelsV3";

const router: Router = new Router();

router.use(authLoginRestrictedLabelsV2);
router.use(authLoginRestrictedLabelsV3);

export default router.routes();
