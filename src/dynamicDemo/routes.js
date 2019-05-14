const Router = require('koa-router');
const router = new Router();
const manifest = require('./manifest');
const file = require('./file');
const collection = require('./collection');
const logo = require('./logo');

router.use(manifest.routes());
router.use(file.routes());
router.use(collection.routes());
router.use(logo.routes());

module.exports = router;
