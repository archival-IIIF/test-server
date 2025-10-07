import Router from '@koa/router';
import * as path from 'path';
import download from '../../lib/Download';

const router: Router = new Router();


router.get('/file/die_internationale_as_mp3', async ctx => {
    const filePath = path.join(__dirname, 'die_internationale_as_mp3.mp3');
    await download(ctx, filePath);
});

router.get('/file/die_internationale_as_mp3/original', async ctx => {
    const filePath = path.join(__dirname, 'die_internationale_as_mp3.mp3');
    await download(ctx, filePath);
});

router.get('/file/f113', async ctx => {
    const filePath = path.join(__dirname, 'F113.mp4');
    await download(ctx, filePath);
});

router.get('/file/elephantsDream', async ctx => {
    const filePath = path.join(__dirname, 'elephants-dream-medium.webm');
    await download(ctx, filePath);
});

export default router.routes();
