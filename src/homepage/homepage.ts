import * as Router from 'koa-router';
import {createReadStream} from 'fs';
import * as path from 'path';

const router: Router = new Router();


router.get('/', async ctx => {
    ctx.type = 'text/html';
    ctx.body = createReadStream(path.join(__dirname, 'homepage.html'));
});

router.get('/homepage.css', async ctx => {
    ctx.type = 'text/css';
    ctx.body = createReadStream(path.join(__dirname, 'homepage.css'));
});

router.get('/main.js', async ctx => {
    ctx.type = 'text/javascript';
    ctx.body = createReadStream(path.join(__dirname, 'main.js'));
});

router.get('/testCases.json', async ctx => {
    ctx.body = {
        General: {
            image: {
                label: 'Test case with images',
                uv: true,
                mirador: true
            },
            audioVideo: {
                label: 'Test case with audio and video files',
                uv: true
            },
            logo: {
                label: 'Test case with a logo',
                uv: true
            },
            rightsInformation: {
                label: 'Test case with license and attribution data',
                uv: true
            },
            thumbnail: {
                label: 'Test case with different thumbnail settings',
                uv: true
            },
            language: {
                label: 'Test case with files in different languages',
                uv: true
            },
            multiLang: {
                label: 'Test case with metadata in different languages',
                uv: true
            },
            pdf: {
                label: 'Test case with pdf files',
                uv: true
            },
            manifestations: {
                label: 'File with two manifestations',
                uv: true
            },
            multiPage: {
                label: 'Test case with a multi page',
                uv: true,
                mirador: true
            },
            provider: {
                uri: 'manifest/provider',
                label: 'Test case with provider information',
                uv: true,
                mirador: true
            },
            rendering: {
                uri: 'manifest/rendering',
                label: 'Test case with rendering',
                uv: true,
                mirador: true
            },
        },
        'No parent': {
            noParent: {
                uri: 'manifest/noParent',
                label: 'Test case without parent',
                uv: true,
                mirador: true
            },
        },
        Directory: {
            emptyCollection: 'Empty collection test case',
            emptyFolder: 'Empty folder test case',
            nestedStructure: 'Test case with a nested structure',
            dynamicDemo: {
                label: 'Dynamic demo',
                v3: false
            },
        },
        Authentication: {
            authLogin: 'Token login test case with a locked collection',
            authLoginRestrictedLabels: 'Token login test case with locked labels',
            authLoginRestrictedLabels2:
                'Locked labels without additional manifest (non-standard)',
            authInfo: {
                label: 'Token login test case with a locked info.json',
                uv: true,
                mirador: true
            },
            authExternalAccept: 'External auth test (accept)',
            authExternalDeny: 'External auth test (deny)',
            authClickThrough: 'Click-through auth test',
            authKiosk: 'Kiosk auth test',
            authMixed: 'Mixed test with login and click-through auth',
        },
        'Invalid manifests': {
            missingManifest: 'Missing manifest',
            noJson: 'No json output',
            noId: 'Missing id in manifest',
            noLabel: 'Missing label in manifest',
            wrongManifestType: 'Wrong manifest type',
            missingSubfolder: 'Missing subfolder in manifest',
            missingParent: 'Missing parent in manifest',
            missingInfoJson: 'Missing info.json',
            loop: 'Loop',
        }
    };
});

export default router.routes();

