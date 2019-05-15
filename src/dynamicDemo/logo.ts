import * as Router from 'koa-router';
import download from '../lib/Download';
import dynamicDemoCommon from './dynamicDemoCommon';

const router: Router = new Router();

router.get('/dynamicDemo/logo.png', async ctx => {

    if (!dynamicDemoCommon.hasLogo()) {
        ctx.throw(404)
    }

    await download(ctx, dynamicDemoCommon.getLogoPath());
});

export default router.routes();
