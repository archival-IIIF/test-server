import {ParameterizedContext} from "koa";
import {getIIIFRouteTree} from "../../lib/Route";
import FileManifest from "../../lib/FileManifest";
import RootCollection from "../../lib/RootCollection";
import Router from '@koa/router';
import * as path from 'path';
import download from '../../lib/Download';
import getBaseUrl from "../../lib/BaseUrl";

const router: Router = new Router();

const collection = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new RootCollection(getBaseUrl(ctx) + prefix + path, 'Encoding test case');

const fileUtf8 = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new FileManifest(
        getBaseUrl(ctx) + prefix + path,
        getBaseUrl(ctx) + '/file/utf8', 'UTF-8 file',
        'Text',
        'text/plain'
    );

const fileUtf8Explicit = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new FileManifest(
        getBaseUrl(ctx) + prefix + path,
        getBaseUrl(ctx) + '/file/utf8Explicit', 'UTF-8 file with explicit html header',
        'Text',
        'text/plain'
    );

const file8859 = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new FileManifest(
        getBaseUrl(ctx) + prefix + path,
        getBaseUrl(ctx) + '/file/8859', 'ISO 8859-1 file',
        'Text',
        'text/plain'
    );

const file8859Explicit = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new FileManifest(
        getBaseUrl(ctx) + prefix + path,
        getBaseUrl(ctx) + '/file/8859Explicit', 'ISO 8859-1 file with explicit html header',
        'Text',
        'text/plain'
    );


router.get('/file/utf8', async  ctx => {
    const filePath = path.join(__dirname, 'encodingUtf8.txt');
    await download(ctx, filePath, undefined);
});

router.get('/file/utf8Explicit', async  ctx => {
    const filePath = path.join(__dirname, 'encodingUtf8.txt');
    await download(ctx, filePath, undefined, 'utf-8');
});

router.get('/file/8859', async  ctx => {
    const filePath = path.join(__dirname, 'encoding8859.txt');
    await download(ctx, filePath, undefined);
});

router.get('/file/8859Explicit', async  ctx => {
    const filePath = path.join(__dirname, 'encoding8859.txt');
    await download(ctx, filePath, undefined, 'ISO-8859-1');
});

export default getIIIFRouteTree([
    {
        path: '/collection/encoding',
        body: collection,
        children: [
            {
                path: '/manifest/encodingUtf8',
                body: fileUtf8,
            },
            {
                path: '/manifest/encodingUtf8Explicit',
                body: fileUtf8Explicit,
            },
            {
                path: '/manifest/encoding8859',
                body: file8859,
            },
            {
                path: '/manifest/encoding8859Explicit',
                body: file8859Explicit,
            }
        ]
    },
], router);
