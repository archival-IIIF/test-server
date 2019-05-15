import * as Router from 'koa-router';
import * as fs from 'fs';
import * as path from 'path';
import dynamicDemoCommon from './dynamicDemoCommon';
import * as sizeOf from 'image-size';

const router: Router = new Router();


router.get('/manifest/dynamicDemo/:id', ctx => {

    const id = dynamicDemoCommon.decode(ctx.params.id);
    const objectPath = path.join(dynamicDemoCommon.getDemoDataPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }


    if (fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404);
    }

    const parentPath = path.resolve(objectPath, '..');
    const mediaTypeAndFormat = dynamicDemoCommon.getMediaTypeAndFormat(objectPath, ctx);

    let output: any = {
        '@id': dynamicDemoCommon.getUriByObjectPath(objectPath, ctx, 'manifest'),
        '@type': 'sc:Manifest',
        label: path.basename(objectPath),
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: dynamicDemoCommon.getUriByObjectPath(parentPath, ctx, 'collection'),
        thumbnail: mediaTypeAndFormat.thumbnail,
        metadata: dynamicDemoCommon.getMetadata(objectPath)
    };

    if (dynamicDemoCommon.hasLogo()) {
        output.logo = dynamicDemoCommon.getLogoUri(ctx);
    }

    if (mediaTypeAndFormat.type === 'dctypes:Image') {
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
            '@id': dynamicDemoCommon.getUriByObjectPath(parentPath, ctx, 'sequence'),
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

    output = dynamicDemoCommon.addMetadata(output, objectPath);

    ctx.body = output;

});

export default router.routes();
