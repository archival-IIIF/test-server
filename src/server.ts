import * as Koa from 'koa';

import audioVideo from './audioVideo/audioVideo';
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

import manifestations from './manifestations/manifestations';


import rightsInformationV2 from './rightsInformation/rightsInformationV2';
import rightsInformationV3 from './rightsInformation/rightsInformationV3';
import image from './image/image';
import image3 from './image/v3/image';
import validation from './validation/validation';
import imageService3 from './image/v3/image-service';
import pdfV2 from './pdf/pdfV2';
import pdfV3 from './pdf/pdfV3';
import nestedStructureV2 from './nestedStructure/nestedStructureV2';
import nestedStructureV3 from './nestedStructure/nestedStructureV3';
import thumbnailV2 from './thumbnail/thumbnailV2';
import thumbnailV3 from './thumbnail/thumbnailV3';
import language from './language/language';
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

app.use(audioVideo);
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
app.use(language);

app.use(image);
app.use(image3);
app.use(imageService3);

app.use(pdfV2);
app.use(pdfV3);
app.use(common);

app.use(validation);

app.use(dynamicDemo);
app.use(manifestations);
app.use(manifestErrorsV2);
app.use(manifestErrorsV3);
app.use(universalViewer);
app.use(mirador);
app.keys = ['secret'];


app.listen(config.port);
console.info(`Listening to http://localhost:${config.port} 🚀`);
