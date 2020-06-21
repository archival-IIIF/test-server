import * as Router from 'koa-router';
import multiLangV2 from "./multiLangV2";
import multiLangV3 from "./multiLangV3";

const router: Router = new Router();

router.use(multiLangV2);
router.use(multiLangV3);

export default router.routes();
