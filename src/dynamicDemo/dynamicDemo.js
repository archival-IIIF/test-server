const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const download = require('../lib/Download');

router.get('/collection/dynamicDemo/:id?', ctx => {

    let id = '/';
    if (ctx.params.id !== undefined) {
        id = decode(ctx.params.id);
    }

    const objectPath = path.join(getDemoPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }

    if (!fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404)
    }

    let output = {
        '@id': getFullId(ctx, objectPath),
        '@type': 'sc:Collection',
        label: path.basename(objectPath),
        '@context': 'http://iiif.io/api/collection/2/context.json'
    };

    if (id !== '/') {
        const parentPath = path.resolve(objectPath, '..');
        output.within = getFullId(ctx, parentPath);
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
                    '@id': getFullId(ctx, subObjectPath),
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

            const mediaTypeAndFormat = getMediaTypeAndFormat(name, ctx);

            let manifest = {
                '@id': getFullId(ctx, subObjectPath),
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


router.get('/manifest/dynamicDemo/:id', ctx => {

    const id = decode(ctx.params.id);
    const objectPath = path.join(getDemoPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }


    if (fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404);
    }

    const parentPath = path.resolve(objectPath, '..');
    const mediaTypeAndFormat = getMediaTypeAndFormat(objectPath, ctx);

    let output = {
        '@id': getFullId(ctx, objectPath),
        '@type': 'sc:Manifest',
        label: path.basename(objectPath),
        '@context': 'http://iiif.io/api/collection/2/context.json',
        within: getFullId(ctx, parentPath),
        thumbnail: mediaTypeAndFormat.thumbnail,
        mediaSequences: [{
            '@id': getSequenceId(ctx, parentPath),
            '@type': 'ixif:MediaSequence',
            'elements': [{
                '@id': getFileId(ctx, objectPath),
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


router.get('/f/dynamicDemo/:id', async ctx => {

    const id = decode(ctx.params.id);
    const objectPath = path.join(getDemoPath(), id);


    if (!fs.existsSync(objectPath)) {
        ctx.throw(404)
    }

    if (fs.lstatSync(objectPath).isDirectory()) {
        ctx.throw(404);
    }

    await download(ctx, objectPath);
});

function getMediaTypeAndFormat(objectPath, ctx) {

    const extension = path.extname(objectPath);

    if (extension === '.mp3') {
        return {
            type: 'dctypes:Sound',
            format: 'audio/mpeg',
            thumbnail: {
                '@id': ctx.request.origin + '/file-icon/mp3.svg',
                format: 'image/svg+xml'
            }
        };
    }

    if (extension === '.m4v') {
        return {
            type: 'dctypes:Document',
            format: 'video/mp4',
            thumbnail: {
                '@id': ctx.request.origin + '/file-icon/mp4.svg',
                format: 'image/svg+xml'
            }
        };
    }

    return {
        type: 'foaf:Document',
        format: 'text/plain',
        thumbnail: undefined
    };
}

function getFullId(ctx, objectPath) {
    const relativePath = encode(objectPath.substr(getDemoPath().length+1));

    if (fs.lstatSync(objectPath).isDirectory()) {
        return ctx.request.origin + '/collection/dynamicDemo/' + relativePath;
    }

    return ctx.request.origin + '/manifest/dynamicDemo/' + relativePath;
}

function getSequenceId(ctx, objectPath) {
    const relativePath = encode(objectPath.substr(getDemoPath().length+1));

    return ctx.request.origin + '/sequence/dynamicDemo/' + relativePath;
}

function getFileId(ctx, objectPath) {
    const relativePath = encode(objectPath.substr(getDemoPath().length+1));

    return ctx.request.origin + '/f/dynamicDemo/' + relativePath;
}

function getDemoPath() {
    return path.join(__dirname, '..', '..', 'demo');
}

function decode(input) {
    input = decodeURIComponent(input);
    return input.replace(/\+\+/g, '\\');
}

function encode(input) {
    input = input.replace(/\\/g, '++');
    return encodeURIComponent(input);
}

module.exports = router;
