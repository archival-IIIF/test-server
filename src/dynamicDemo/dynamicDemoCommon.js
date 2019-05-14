const fs = require('fs');
const path = require('path');
const filesize = require('filesize');

const pronoms = {
    mp3: {
        id: 687,
        name: 'MPEG 1/2 Audio Layer 3'
    },
    jpg: {
        id: 667,
        name: 'JPEG File Interchange Format'
    },
    txt: {
        id: 163,
        name: 'Plain Text File'
    },
    mp4: {
        id: 924,
        name: 'MPEG-4 Media File'
    }
};

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

        if (extension === '.png') {
            const relativePath = this.getRelativePath(objectPath);
            return {
                type: 'dctypes:Image',
                format: 'image/png',
                thumbnail: {
                    '@id': this.getIIIFThumbnail(relativePath, ctx),
                    format: 'image/png'
                }
            };
        }

        if (extension === '.m4v' || extension === '.mp4') {
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

    static getRelativePath(objectPath) {
        return this.encode(objectPath.substr(this.getDemoDataPath().length + 1));
    }

    static getIIIFThumbnail(relativePath, ctx) {
        return ctx.request.origin + '/image/dynamicDemo/' + relativePath + '/full/!100,100/0/default.jpg'
    }

    static getUriByObjectPath(objectPath, ctx, type) {

        if (!type) {
            type = 'collection';
        }

        const relativePath = this.getRelativePath(objectPath);

        return ctx.request.origin + '/' + type + '/dynamicDemo/' + relativePath;
    }

    static getFileId(ctx, objectPath) {
        const relativePath = this.getRelativePath(objectPath);

        return ctx.request.origin + '/f/dynamicDemo/' + relativePath;
    }

    static getDemoPath() {
        return path.join(__dirname, '..', '..', 'demo');
    }

    static getCachePath() {
        return path.join(this.getDemoPath(), 'cache');
    }

    static getDemoDataPath() {
        return path.join(this.getDemoPath(), 'data');
    }

    static hasLogo() {
        return fs.existsSync(this.getLogoPath());
    }

    static getLogoUri(ctx) {
        return ctx.request.origin + '/dynamicDemo/logo.png';
    }

    static getLogoPath() {
        return path.join(this.getDemoPath(), 'logo.png');
    }

    static decode(input) {
        input = decodeURIComponent(input);
        input = input.replace(/\+\+/g, '\\');
        return input.replace(/--/g, '\/');
    }

    static encode(input) {
        input = input.replace(/\\/g, '++');
        input = input.replace(/\//g, '--');
        return encodeURIComponent(input);
    }

    static getFullPath(input) {
        const id = this.decode(input);
        return path.join(this.getDemoDataPath(), id);
    }

    static addMetadata(output, objectPath) {
        const globalMetadataPath = this.getDemoPath() + '/manifest.json';
        if (fs.existsSync(globalMetadataPath)) {
            let additionalMetadata = JSON.parse(fs.readFileSync(globalMetadataPath, 'utf8'));
            output = Object.assign(output, additionalMetadata);
        }



        let metadataPath;
        if (fs.lstatSync(objectPath).isDirectory()) {
            metadataPath =  objectPath + '/manifest.json';
        } else {
            metadataPath =  objectPath + '.manifest.json';
        }

        if (fs.existsSync(metadataPath)) {
            let additionalMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
            output = Object.assign(output, additionalMetadata);
        }


        return output;
    }

    static getMetadata(objectPath) {

        let metadata = [];

        const extension = path.extname(objectPath).substr(1);

        if (pronoms.hasOwnProperty(extension)) {
            const pronom = pronoms[extension];
            metadata.push({
                label: 'Original file type',
                value: '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status='+
                'detailReport&id=' + pronom.id + '\"> '+pronom.name+' (.' + extension + ')</a>'
            });
        }

        const stats = fs.statSync(objectPath);
        metadata.push({
            label: 'Original file size',
            value: filesize(stats.size)
        });
        metadata.push({
            label: 'Original modification date',
            value: stats.mtime.toLocaleString()
        });

        return metadata;
    }
}

module.exports = DynamicDemoCommon;
