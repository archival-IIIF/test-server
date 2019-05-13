const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const dynamicDemoCommon = require('./dynamicDemoCommon');

router.get('/manifest/dynamicDemo/:id', ctx => {

    const id = dynamicDemoCommon.decode(ctx.params.id);
    const objectPath = path.join(dynamicDemoCommon.getDemoPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }


    if (fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404);
    }

    const parentPath = path.resolve(objectPath, '..');
    const mediaTypeAndFormat = dynamicDemoCommon.getMediaTypeAndFormat(objectPath, ctx);

    let output = {
        '@id': dynamicDemoCommon.getFullId(ctx, objectPath),
        '@type': 'sc:Manifest',
        label: path.basename(objectPath),
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: dynamicDemoCommon.getFullId(ctx, parentPath),
        thumbnail: mediaTypeAndFormat.thumbnail,
        mediaSequences: [{
            '@id': dynamicDemoCommon.getSequenceId(ctx, parentPath),
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': dynamicDemoCommon.getFileId(ctx, objectPath),
                '@type': mediaTypeAndFormat.type,
                'format': mediaTypeAndFormat.format,
                'rendering': {
                    '@id': ctx.request.origin + '/file/txt/original',
                    'label': 'Original copy',
                    'format': 'text/plain'
                }
            }]
        }]
    };

    const metadataPath = objectPath + '.metadata.json';
    if (fs.existsSync(metadataPath)) {
        let additionalMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        output = Object.assign(output, additionalMetadata);
    }

    ctx.body = output;

});

module.exports = router;
