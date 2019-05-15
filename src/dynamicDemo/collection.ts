import * as Router from 'koa-router';

const router: Router = new Router();

const fs = require('fs');
import * as path from 'path';
const dynamicDemoCommon = require('./dynamicDemoCommon');

router.get('/collection/dynamicDemo/:id?', ctx => {

    let id = '/';
    if (ctx.params.id !== undefined) {
        id = dynamicDemoCommon.decode(ctx.params.id);
    }

    const objectPath = path.join(dynamicDemoCommon.getDemoDataPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }

    if (!fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404)
    }

    let output: any = {
        '@id': dynamicDemoCommon.getUriByObjectPath(objectPath, ctx, 'collection'),
        '@type': 'sc:Collection',
        label: path.basename(objectPath),
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };

    if (id !== '/') {
        const parentPath = path.resolve(objectPath, '..');
        output.within = dynamicDemoCommon.getUriByObjectPath(parentPath, ctx, 'collection');
    }

    if (dynamicDemoCommon.hasLogo()) {
        output.logo = dynamicDemoCommon.getLogoUri(ctx);
    }

    fs.readdirSync(objectPath).map((name: string) => {

        const subObjectPath = path.join(objectPath, name);

        if (fs.lstatSync(subObjectPath).isDirectory()) {
            if (!output.hasOwnProperty('collections')) {
                output.collections = [];
            }

            output.collections.push(
                {
                    '@id': dynamicDemoCommon.getUriByObjectPath(subObjectPath, ctx, 'collection'),
                    '@type': 'sc:Collection',
                    label: name,
                }
            );

        } else {
            if (name.endsWith('manifest.json')) {
                return;
            }

            if (name.startsWith('___')) {
                return;
            }

            if (!output.hasOwnProperty('manifests')) {
                output.manifests = [];
            }

            const mediaTypeAndFormat = dynamicDemoCommon.getMediaTypeAndFormat(subObjectPath, ctx);

            let manifest = {
                '@id': dynamicDemoCommon.getUriByObjectPath(subObjectPath, ctx, 'manifest'),
                '@type': 'sc:Manifest',
                label: name,
                thumbnail: mediaTypeAndFormat.thumbnail,
            };

            manifest = dynamicDemoCommon.addMetadata(manifest, subObjectPath);

            output.manifests.push(manifest);
        }
    });

    output = dynamicDemoCommon.addMetadata(output, objectPath);

    ctx.body = output;

});

export default router.routes();
