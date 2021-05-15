import * as Router from 'koa-router';
import {addArielRoute} from "../../imageService/imageBase";

const router: Router = new Router();

addArielRoute(router, 'noParent', '')

export default router.routes();
