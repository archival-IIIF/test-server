import * as Router from 'koa-router';

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

import manifest from './manifest';
import file from './file';
import collection from './collection';
import logo from './logo';

router.use(manifest);
router.use(file);
router.use(collection);
router.use(logo);

export default router.routes();
