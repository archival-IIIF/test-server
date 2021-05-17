import * as Koa from 'koa';
import * as path from 'path';
import audioVideoFiles from './cases/audioVideo/audioVideoFiles';
import audioVideo from './cases/audioVideo/audioVideo';
import clickThrough from './auth/clickThrough';
import authClickThrough from './cases/authClickThrough/authClickThrough';
import authExternal from './cases/authExternal/authExternal';
import external from './auth/external';
import authInfo from "./authInfo/authInfo";
import login from "./auth/login";
import authLogin from "./cases/authLogin/authLogin";
import common from './common/common';
import dynamicDemo from './dynamicDemo/routes';
import emptyCollection from './cases/emptyCollection/emptyCollection';
import emptyFolder from './cases/emptyFolder/emptyFolder';
import homepage from './homepage/homepage';
import image from './cases/image/image';
import languageFiles from "./cases/language/languageFiles";
import language from './cases/language/language';
import logoFiles from "./cases/logo/logoFiles";
import logo from './cases/logo/logo';
import manifestErrorsV2 from './cases/manifestErrors/manifestErrorsV2';
import manifestErrorsV3 from './cases/manifestErrors/manifestErrorsV3';
import manifestationsFiles from "./cases/manifestations/manifestationsFiles";
import manifestations from './cases/manifestations/manifestations';
import mirador from './mirador/mirador'
import multiPage from './cases/multiPage/multiPage';
import pdfFiles from "./cases/pdf/pdfFiles";
import pdf from './cases/pdf/pdf';
import rightsInformation from './cases/rightsInformation/rightsInformation';
import thumbnail from './cases/thumbnail/thumbnail';
import universalViewer from './universalViewer/universalViewer'
import validation from './validation/validation';
import authMixed from "./cases/authMixed/authMixed";
import kiosk from "./auth/kiosk";
import authKiosk from "./cases/authKiosk/authKiosk";
import authLoginRestrictedLabels from "./authLoginRestrictedLabels/authLoginRestrictedLabels";
import nestedStructure from "./cases/nestedStructure/nestedStructure";
import authLoginRestrictedLabels2 from "./cases/authLoginRestrictedLabels2/authLoginRestrictedLabels2";
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

// cases
app.use(audioVideo);
app.use(audioVideoFiles);
app.use(authLogin);
app.use(authLoginRestrictedLabels);
app.use(authLoginRestrictedLabels2);
app.use(authInfo);
app.use(authExternal);
app.use(authClickThrough);
app.use(authKiosk);
app.use(authMixed);
app.use(emptyCollection);
app.use(emptyFolder);
app.use(logo);
app.use(logoFiles);
app.use(rightsInformation);
app.use(thumbnail);
app.use(nestedStructure);
app.use(language);
app.use(languageFiles);
app.use(image);
app.use(multiPage);
app.use(pdfFiles);
app.use(pdf);
app.use(multiLang);
app.use(manifestations);
app.use(manifestationsFiles);
app.use(manifestErrorsV2);
app.use(manifestErrorsV3);
app.use(noParent);


app.use(dynamicDemo);

app.use(homepage);
app.use(common);
app.use(universalViewer);
app.use(mirador);
app.use(validation);

app.use(clickThrough);
app.use(kiosk);
app.use(external);
app.use(login);


app.keys = ['secret'];


app.listen(config.port);

console.info(`Listening to http://localhost:${config.port} 🚀`);
