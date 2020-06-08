import * as Koa from 'koa';

import audioVideoV2 from './audioVideo/audioVideoV2';
import audioVideoV3 from './audioVideo/audioVideoV3';
import auth from './auth/auth';
import auth2 from './auth2/auth2';
import auth3 from './auth3/auth3';
import auth4 from './auth4/auth4';
import authExternal from './authExternal/authExternal';

import emptyCollection from './emptyCollection/emptyCollection';
import emptyFolderV2 from './emptyFolder/emptyFolderV2';
import emptyFolderV3 from './emptyFolder/emptyFolderV3';

import homepage from './homepage/homepage';


import logoV2 from './logo/logoV2';
import logoV3 from './logo/logoV3';

import manifestationsV2 from './manifestations/manifestationsV2';
import manifestationsV3 from './manifestations/manifestationsV3';


import rightsInformationV2 from './rightsInformation/rightsInformationV2';
import rightsInformationV3 from './rightsInformation/rightsInformationV3';
import imageV2 from './image/imageV2';
import imageV3 from './image/imageV3';
import multiPageV2 from './multiPage/multiPageV2';
import multiPageV3 from './multiPage/multiPageV3';
import validation from './validation/validation';
import imageServiceV2 from './imageService/imageServiceV2';
import imageServiceV3 from './imageService/imageServiceV3';
import pdfV2 from './pdf/pdfV2';
import pdfV3 from './pdf/pdfV3';
import pdfFiles from "./pdf/pdfFiles";
import nestedStructureV2 from './nestedStructure/nestedStructureV2';
import nestedStructureV3 from './nestedStructure/nestedStructureV3';
import thumbnailV2 from './thumbnail/thumbnailV2';
import thumbnailV3 from './thumbnail/thumbnailV3';
import languageV2 from './language/languageV2';
import languageV3 from './language/languageV3';
import common from './common/common';

import dynamicDemo from './dynamicDemo/routes';
import manifestErrorsV2 from './manifestErrors/manifestErrorsV2';
import manifestErrorsV3 from './manifestErrors/manifestErrorsV3';
import universalViewer from './universalViewer/universalViewer'
import mirador from './mirador/mirador'

const app: Koa = new Koa();
const {fileIconsPath} = require('./lib/FileIcon');
const serve = require('koa-static-server');
const config = require('./lib/Config');
import * as path from 'path';
const bodyParser = require('koa-bodyparser');


app.use(async (ctx: Koa.Context, next: Function) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (ctx.method === 'OPTIONS')
        ctx.status = 204;
    else
        await next();
});

app.use(serve({rootDir: fileIconsPath, rootPath: '/file-icon'}));
app.use(serve({rootDir: path.join(__dirname, './public'), rootPath: '/public'}));
app.use(serve({rootDir: path.join(__dirname, './../node_modules/jquery/dist/'), rootPath: '/jquery'}));
app.use(serve({rootDir: path.join(__dirname, './../node_modules/bootstrap/dist/'), rootPath: '/bootstrap'}));
app.use(serve({rootDir: path.join(__dirname, './../node_modules/universalviewer/dist/'), rootPath: '/uv'}));
app.use(serve({rootDir: path.join(__dirname, './../node_modules/mirador/dist/'), rootPath: '/miradorJS'}));
app.use(bodyParser());

app.use(audioVideoV2);
app.use(audioVideoV3);
app.use(auth);
app.use(auth2);
app.use(auth3);
app.use(auth4);
app.use(authExternal);

app.use(emptyCollection);
app.use(emptyFolderV2);
app.use(emptyFolderV3);

app.use(homepage);


app.use(logoV2);
app.use(logoV3);
app.use(rightsInformationV2);
app.use(rightsInformationV3);
app.use(thumbnailV2);
app.use(thumbnailV3);
app.use(nestedStructureV2);
app.use(nestedStructureV3);
app.use(languageV2);
app.use(languageV3);

app.use(imageV2);
app.use(imageV3);
app.use(imageServiceV2);
app.use(imageServiceV3);
app.use(multiPageV2);
app.use(multiPageV3);

app.use(pdfFiles);
app.use(pdfV2);
app.use(pdfV3);
app.use(common);

app.use(validation);

app.use(dynamicDemo);
app.use(manifestationsV2);
app.use(manifestationsV3);
app.use(manifestErrorsV2);
app.use(manifestErrorsV3);
app.use(universalViewer);
app.use(mirador);
app.keys = ['secret'];


app.listen(config.port);
console.info(`Listening to http://localhost:${config.port} 🚀`);
