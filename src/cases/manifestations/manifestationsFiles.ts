import Router from '@koa/router';

const router = new Router();

import * as path from 'node:path';
import download from '../../lib/Download';

router.get('/file/manifestation', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/PDFa.pdf');
    await download(ctx, filePath);
});

router.get('/file/manifestation/original', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/test.docx');
    await download(ctx, filePath);
});

router.get('/file/manifestation/access', async  ctx => {
    const filePath = path.join(__dirname, '../pdf/PDFa.pdf');
    await download(ctx, filePath);
});

export default router.routes();
