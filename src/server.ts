import * as Koa from 'koa';

import audioVideo from './audioVideo/audioVideo';
import auth from './auth/auth';
import auth2 from './auth2/auth2';
import auth3 from './auth3/auth3';
import auth4 from './auth4/auth4';

import emptyCollection from './emptyCollection/emptyCollection';
import emptyFolder from './emptyFolder/emptyFolder';

import homepage from './homepage/homepage';


import logo from './logo/logo';

import manifestations from './manifestations/manifestations';


import rightsInformation from './rightsInformation/rightsInformation';
import image from './image/image';
import pdf from './pdf/pdf';
import nestedStructure from './nestedStructure/nestedStructure';
import thumbnail from './thumbnail/thumbnail';
import language from './language/language';
import contentLanguage from './language/contentLanguage';
import common from './common/common';

import dynamicDemo from './dynamicDemo/routes';
import manifestErrors from './manifestErrors/manifestErrors';
import universalViewer from './universalViewer/universalViewer'

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
app.use(bodyParser());

app.use(audioVideo);
app.use(auth);
app.use(auth2);
app.use(auth3);
app.use(auth4);

app.use(emptyCollection);
app.use(emptyFolder);

app.use(homepage);


app.use(logo);
app.use(rightsInformation);
app.use(thumbnail);
app.use(nestedStructure);
app.use(language);
app.use(contentLanguage);

app.use(image);
app.use(pdf);
app.use(common);

app.use(dynamicDemo);
app.use(manifestations);
app.use(manifestErrors);
app.use(universalViewer);
app.keys = ['secret'];


app.listen(config.port);
console.info(`Listening to http://localhost:${config.port} 🚀`);
