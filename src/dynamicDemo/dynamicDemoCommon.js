const fs = require('fs');
const path = require('path');

class DynamicDemoCommon {


    static getMediaTypeAndFormat(objectPath, ctx) {

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

        if (extension === '.jpg') {
            const relativePath = this.getRelativePath(objectPath);
            return {
                type: 'dctypes:Image',
                format: 'image/jpeg',
                thumbnail: {
                    '@id': this.getIIIFThumbnail(relativePath, ctx),
                    format: 'image/jpeg'
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

    static getFullId(ctx, objectPath) {
        const relativePath = this.getRelativePath(objectPath);

        if (fs.lstatSync(objectPath).isDirectory()) {
            return ctx.request.origin + '/collection/dynamicDemo/' + relativePath;
        }

        return ctx.request.origin + '/manifest/dynamicDemo/' + relativePath;
    }

    static getRelativePath(objectPath) {
        return this.encode(objectPath.substr(this.getDemoPath().length+1));
    }

    static getIIIFThumbnail(relativePath, ctx) {
        return ctx.request.origin + '/image/dynamicDemo/'+relativePath+'/full/!100,100/0/default.jpg'
    }

    static getSequenceId(ctx, objectPath) {
        const relativePath = this.getRelativePath(objectPath);

        return ctx.request.origin + '/sequence/dynamicDemo/' + relativePath;
    }

    static getUriByObjectPath(objectPath, ctx, type) {

        if (!type) {
            type = 'collection';
        }

        const relativePath = this.getRelativePath(objectPath);

        return ctx.request.origin + '/'+type+'/dynamicDemo/' + relativePath;
    }

    static getFileId(ctx, objectPath) {
        const relativePath = this.getRelativePath(objectPath);

        return ctx.request.origin + '/f/dynamicDemo/' + relativePath;
    }

    static getDemoPath() {
        return path.join(__dirname, '..', '..', 'demo');
    }

    static decode(input) {
        input = decodeURIComponent(input);
        return input.replace(/\+\+/g, '\\');
    }

    static encode(input) {
        input = input.replace(/\\/g, '++');
        return encodeURIComponent(input);
    }

    static getFullPath(input) {
        const id = this.decode(input);
        return path.join(this.getDemoPath(), id);
    }
}

module.exports = DynamicDemoCommon;