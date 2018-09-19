const Router = require('koa-router');
const Koa = require('koa');
const app = new Koa();
const logo = require('./logo/logo.js');
const rightsInformation = require('./rightsInformation/rightsInformation.js');
const audioVideo = require('./audioVideo/audioVideo.js');
const image = require('./image/image.js');
const pdf = require('./pdf/pdf.js');
const nestedStructure = require('./nestedStructure/nestedStructure.js');
const thumbnail = require('./thumbnail/thumbnail.js');
const emptyFolder = require('./emptyFolder/emptyFolder.js');
const homepage = require('./homepage/homepage.js');
const language = require('./language/language.js');
const contentLanguage = require('./language/contentLanguage.js');
const emptyCollection = require('./emptyCollection/emptyCollection.js');
const common = require('./common/common.js');
const auth = require('./auth/auth.js');
const auth2 = require('./auth2/auth2.js');
const auth3 = require('./auth3/auth3.js');
const manifestErrors = require('./manifestErrors/manifestErrors.js');
const {fileIconsPath} = require('./lib/FileIcon');
const serve = require('koa-static-server');
const config = require('./lib/Config');
const path = require('path');
const bodyParser = require('koa-bodyparser');


app.use(async (ctx, next) => {
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
app.use(bodyParser());
app.use(logo.routes());
app.use(rightsInformation.routes());
app.use(audioVideo.routes());
app.use(thumbnail.routes());
app.use(nestedStructure.routes());
app.use(language.routes());
app.use(contentLanguage.routes());
app.use(emptyCollection.routes());
app.use(emptyFolder.routes());
app.use(image.routes());
app.use(pdf.routes());
app.use(homepage.routes());
app.use(common.routes());
app.use(auth.routes());
app.use(auth2.routes());
app.use(auth3.routes());
app.use(manifestErrors.routes());
app.keys = ['secret'];


app.listen(config.port);