import Router from '@koa/router';
import * as path from 'path';
import download from '../../lib/Download';

const router = new Router();


router.get('/file/pdf1', async  ctx => {
    const filePath = path.join(__dirname, 'test.pdf');
    await download(ctx, filePath);
});

router.get('/file/docx', async  ctx => {
    const filePath = path.join(__dirname, 'test.docx');
    await download(ctx, filePath);
});

router.get('/file/pdfa', async  ctx => {
    const filePath = path.join(__dirname, 'PDFa.pdf');
    await download(ctx, filePath);
});

export default router.routes();
