import * as Router from 'koa-router';

const path = require('path');
const mime = require('mime-types');
const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const HttpError = require('../lib/HttpError');


async function download(ctx: Router.RouterContext, filePath: string, fileName?: string) {
    try {
        if (!fileName) {
            fileName = path.basename(filePath);
        }
        ctx.set('Content-Type', mime.contentType(filePath));
        ctx.set('Content-Disposition', 'inline; filename="' + fileName + '"');
        ctx.body = await readFileAsync(filePath);
    }
    catch (err) {
        throw new HttpError(404);
    }
}

export default download;
