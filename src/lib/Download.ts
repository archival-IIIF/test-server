import * as path from 'node:path';
import * as mime from 'mime-types';
import * as fs from 'node:fs';
import {promisify} from 'node:util';
const readFileAsync = promisify(fs.readFile);
import HttpError from '../lib/HttpError';
import type {Context} from "koa";


async function download(ctx: Context, filePath: string, fileName?: string, encoding?: string) {
    try {
        if (!fileName) {
            fileName = path.basename(filePath);
        }
        const contentType = [];
        const mimeType = mime.lookup(filePath);
        if (mimeType) {
            contentType.push(mimeType);
        }
        if (encoding) {
            contentType.push('charset=' + encoding);
        }
        ctx.set('Content-Type', contentType.join('; '));
        ctx.set('Content-Disposition', 'inline; filename="' + fileName + '"');
        ctx.body = await readFileAsync(filePath);
    }
    catch (_err) {
        throw new HttpError(404);
    }
}

export default download;
