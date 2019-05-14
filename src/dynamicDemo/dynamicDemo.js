const Router = require('koa-router');
const router = new Router();
const dynamicDemoManifest = require('./dynamicDemoManifest');
const dynamicDemoFile = require('./dynamicDemoFile');
const dynamicDemoCollection = require('./dynamicDemoCollection');
const logo = require('./logo');

router.use(dynamicDemoManifest.routes());
router.use(dynamicDemoFile.routes());
router.use(dynamicDemoCollection.routes());
router.use(logo.routes());

module.exports = router;
