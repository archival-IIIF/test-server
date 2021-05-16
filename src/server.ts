import * as Koa from 'koa';
import * as path from 'path';
import audioVideoFiles from './cases/audioVideo/audioVideoFiles';
import audioVideo from './cases/audioVideo/audioVideo';
import authClickThrough from './authClickThrough/authClickThrough';
import authExternal from './authExternal/authExternal';
import authInfo from "./authInfo/authInfo";
import authLoginPartly from "./authLoginPartly/authLoginPartly";
import authLogin from "./authLogin/authLogin";
import common from './common/common';
import dynamicDemo from './dynamicDemo/routes';
import emptyCollection from './cases/emptyCollection/emptyCollection';
import emptyFolder from './cases/emptyFolder/emptyFolder';
import homepage from './homepage/homepage';
import image from './cases/image/image';
import languageFiles from "./cases/language/languageFiles";
import languageV2 from './cases/language/languageV2';
import languageV3 from './cases/language/languageV3';
import logoFiles from "./cases/logo/logoFiles";
import logoV2 from './cases/logo/logoV2';
import logoV3 from './cases/logo/logoV3';
import manifestErrorsV2 from './cases/manifestErrors/manifestErrorsV2';
import manifestErrorsV3 from './cases/manifestErrors/manifestErrorsV3';
import manifestationsFiles from "./cases/manifestations/manifestationsFiles";
import manifestationsV2 from './cases/manifestations/manifestationsV2';
import manifestationsV3 from './cases/manifestations/manifestationsV3';
import mirador from './mirador/mirador'
import multiPageV2 from './cases/multiPage/multiPageV2';
import multiPageV3 from './cases/multiPage/multiPageV3';
import pdfFiles from "./cases/pdf/pdfFiles";
import pdfV2 from './cases/pdf/pdfV2';
import pdfV3 from './cases/pdf/pdfV3';
import rightsInformationV2 from './cases/rightsInformation/rightsInformationV2';
import rightsInformationV3 from './cases/rightsInformation/rightsInformationV3';
import thumbnailV2 from './cases/thumbnail/thumbnailV2';
import thumbnailV3 from './cases/thumbnail/thumbnailV3';
import universalViewer from './universalViewer/universalViewer'
import validation from './validation/validation';
import authMixed from "./authMixed/authMixed";
import authKiosk from "./authKiosk/authKiosk";
import authLoginRestrictedLabels from "./authLoginRestrictedLabels/authLoginRestrictedLabels";
import nestedStructure from "./cases/nestedStructure/nestedStructure";
import authLoginRestrictedLabels2 from "./authLoginRestrictedLabels2/authLoginRestrictedLabels2";
import multiLang from "./cases/multiLang/multiLang";
import noParent from "./cases/noParent/noParent";


const app: Koa = new Koa();
const {fileIconsPath} = require('./lib/FileIcon');
const serve = require('koa-static-server');
const config = require('./lib/Config');
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
app.use(audioVideoFiles);

app.use(authLogin);
app.use(authLoginPartly);
app.use(authLoginRestrictedLabels);
app.use(authLoginRestrictedLabels2);
app.use(authInfo);
app.use(authExternal);
app.use(authClickThrough);
app.use(authKiosk);
app.use(authMixed);

app.use(emptyCollection);
app.use(emptyFolder);

app.use(homepage);


app.use(logoV2);
app.use(logoV3);
app.use(logoFiles);
app.use(rightsInformationV2);
app.use(rightsInformationV3);
app.use(thumbnailV2);
app.use(thumbnailV3);
app.use(nestedStructure);
app.use(languageV2);
app.use(languageV3);
app.use(languageFiles);

app.use(image);
app.use(multiPageV2);
app.use(multiPageV3);

app.use(pdfFiles);
app.use(pdfV2);
app.use(pdfV3);
app.use(multiLang);
app.use(common);

app.use(validation);

app.use(dynamicDemo);
app.use(manifestationsV2);
app.use(manifestationsV3);
app.use(manifestationsFiles);
app.use(manifestErrorsV2);
app.use(manifestErrorsV3);
app.use(noParent);
app.use(universalViewer);
app.use(mirador);
app.keys = ['secret'];


app.listen(config.port);

console.info(`Listening to http://localhost:${config.port} 🚀`);
