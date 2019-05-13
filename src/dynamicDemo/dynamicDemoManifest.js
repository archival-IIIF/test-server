const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const dynamicDemoCommon = require('./dynamicDemoCommon');
const sizeOf = require('image-size');

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
    };

    if (objectPath.endsWith('.jpg')) {
        const dimensions = sizeOf(objectPath);
        const imageWith = dimensions.width;
        const imageHeight = dimensions.height;
        output.sequences = [{
            '@id': dynamicDemoCommon.getUriByObjectPath(objectPath, ctx, 'sequence'),
            '@type': 'sc:Sequence',
            canvases: [{
                '@id': dynamicDemoCommon.getUriByObjectPath(objectPath, ctx, 'canvas'),
                '@type': 'sc:Canvas',
                width: imageWith,
                height: imageHeight,
                images: [{
                    '@id': dynamicDemoCommon.getUriByObjectPath(objectPath, ctx, 'annotation'),
                    '@type': 'oa:Annotation',
                    motivation: 'sc:painting',
                    resource: {
                        '@id': dynamicDemoCommon.getIIIFThumbnail(objectPath, ctx, ),
                        '@type': 'dctypes:Image',
                        format: 'image/jpeg',
                        width: imageWith,
                        height: imageHeight,
                        service: {
                            '@id': dynamicDemoCommon.getUriByObjectPath(objectPath, ctx, 'image'),
                            protocol: 'http://iiif.io/api/image',
                            width: imageWith,
                            height: imageHeight,
                            sizes: [],
                            profile: 'http://iiif.io/api/image/2/level2.json'
                        }
                    },
                    "on": dynamicDemoCommon.getUriByObjectPath(objectPath, ctx, 'canvas')
                }]
            }]
        }]
    } else {
        output.mediaSequences = [{
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
    }

    const metadataPath = objectPath + '.metadata.json';
    if (fs.existsSync(metadataPath)) {
        let additionalMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        output = Object.assign(output, additionalMetadata);
    }

    ctx.body = output;

});

module.exports = router;
