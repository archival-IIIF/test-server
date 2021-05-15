import * as Router from 'koa-router';
import * as path from 'path';
import download from '../../lib/Download';

const router: Router = new Router();

router.get('/file/languageFile1', async  ctx => {
    const filePath = path.join(__dirname, 'colecções digitais afluência.docx');
    await download(ctx, filePath);
});

router.get('/file/languageFile2', async  ctx => {
    const filePath = path.join(__dirname, 'Приток цифровых коллекций.docx');
    // decoding problem!
    await download(ctx, filePath, 'languageFile2');
});

router.get('/file/languageFile3', async  ctx => {
    const filePath = path.join(__dirname, 'مجموعه های دیجیتال جریان.docx');
    // decoding problem!
    await download(ctx, filePath, 'languageFile3');
});

router.get('/file/languageFile4', async  ctx => {
    const filePath = path.join(__dirname, 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx');
    // decoding problem!
    await download(ctx, filePath, 'languageFile4');
});

router.get('/file/languageFile5', async  ctx => {
    const filePath = path.join(__dirname, '流入數字館藏.docx');
    // decoding problem!
    await download(ctx, filePath, 'languageFile5');
});

export default router.routes();

