const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const dynamicDemoCommon = require('./dynamicDemoCommon');

router.get('/collection/dynamicDemo/:id?', ctx => {

    let id = '/';
    if (ctx.params.id !== undefined) {
        id = dynamicDemoCommon.decode(ctx.params.id);
    }

    const objectPath = path.join(dynamicDemoCommon.getDemoPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }

    if (!fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404)
    }

    let output = {
        '@id': dynamicDemoCommon.getFullId(ctx, objectPath),
        '@type': 'sc:Collection',
        label: path.basename(objectPath),
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };

    if (id !== '/') {
        const parentPath = path.resolve(objectPath, '..');
        output.within = dynamicDemoCommon.getFullId(ctx, parentPath);
    }

    const metadataPath = objectPath + '/metadata.json';
    if (fs.existsSync(metadataPath)) {
        let additionalMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        output = Object.assign(output, additionalMetadata);
    }

    fs.readdirSync(objectPath).map(name => {

        const subObjectPath = path.join(objectPath, name);

        if (fs.lstatSync(subObjectPath).isDirectory()) {
            if (!output.hasOwnProperty('collections')) {
                output.collections = [];
            }

            output.collections.push(
                {
                    '@id': dynamicDemoCommon.getFullId(ctx, subObjectPath),
                    '@type': 'sc:Collection',
                    label: name,
                }
            );

        } else {
            if (name.endsWith('metadata.json')) {
                return;
            }

            if (!output.hasOwnProperty('manifests')) {
                output.manifests = [];
            }

            const mediaTypeAndFormat = dynamicDemoCommon.getMediaTypeAndFormat(subObjectPath, ctx);

            let manifest = {
                '@id': dynamicDemoCommon.getFullId(ctx, subObjectPath),
                '@type': 'sc:Manifest',
                label: name,
                thumbnail: mediaTypeAndFormat.thumbnail,
            };

            const metadataPath = subObjectPath + '.metadata.json';
            if (fs.existsSync(metadataPath)) {
                let additionalMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                manifest = Object.assign(manifest, additionalMetadata);
            }

            output.manifests.push(manifest);


        }
    });
    ctx.body = output;

});

module.exports = router;
