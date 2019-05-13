const Router = require('koa-router');
const router = new Router();
const dynamicDemoManifest = require('./dynamicDemoManifest');
const dynamicDemoFile = require('./dynamicDemoFile');
const dynamicDemoCollection = require('./dynamicDemoCollection');

router.use(dynamicDemoManifest.routes());
router.use(dynamicDemoFile.routes());
router.use(dynamicDemoCollection.routes());

module.exports = router;
