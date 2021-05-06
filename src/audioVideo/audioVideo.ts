import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import Resource from "../presentation-builder/v3/Resource";
import FileManifest from "../lib/FileManifest";
import RootCollection from "../lib/RootCollection";
import * as path from "path";
import * as fs from "fs";

export function getAudioVideo(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/audioVideo';
    const c = new RootCollection(url, 'Audio & video test case');
    c.setItems([
        getDieInternationale(ctx, prefix),
        getF113(ctx, prefix),
        getElephantsDream(ctx, prefix),
    ]);

    return c;
}


export function getDieInternationale(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/die_internationale_as_mp3';
    const m = new FileManifest(url, ctx.request.origin + '/file/die_internationale_as_mp3', 'Die_Internationale as mp3.mp3', 'Audio', 'audio/mp3');
    m.setParent(ctx.request.origin + prefix + '/collection/audioVideo', 'Collection');
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/mp3.svg', 'Image', 'image/svg+xml'));
    m.setMetadata([
        {
            label: {none: ['Original file type']},
            value: {none: [ '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=687\">MPEG 1/2 Audio Layer 3 (.mp3)</a>']}
        },
        {
            label: {none: ['Original file size']},
            value: {none: [ '242.04 KB']}
        },
        {
            label: {none: ['Original modification date']},
            value: {none: [ 'July 11th 2018']}
        }
    ]);
    m.setRights('http://creativecommons.org/licenses/by-sa/3.0/');

    return m;
}

export function getF113(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/f113';
    const m = new FileManifest(url, ctx.request.origin + '/file/f113', 'F113.mp4', 'Video', 'video/mp4');
    m.setParent(ctx.request.origin + prefix + '/collection/audioVideo', 'Collection');
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/mp4.svg', 'Image', 'image/svg+xml'));
    m.setMetadata([
        {
            label: {none: ['Original file type']},
            value: {none: [ '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=924\">MPEG-4 Media File (.f4a, .f4v, .m4a, .m4v, .mp4)</a>']}
        },
        {
            label: {none: ['Original file size']},
            value: {none: [ '6.86 MB']}
        },
        {
            label: {none: ['Original modification date']},
            value: {none: [ 'July 11th 2018']}
        }
    ]);
    m.setRights('http://creativecommons.org/licenses/by-sa/3.0/');

    return m;
}

export function getElephantsDream(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/elephantsDream';
    const m = new FileManifest(url, ctx.request.origin + '/file/elephantsDream', 'elephants-dream-medium.webm', 'Video', 'video/webm');
    m.setParent(ctx.request.origin + prefix + '/collection/audioVideo', 'Collection');
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/mp4.svg', 'Image', 'image/svg+xml'));
    m.setMetadata([
        {
            label: {none: ['Original file type']},
            value: {none: [ '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=1361\">WebM</a>']}
        },
        {
            label: {none: ['Original file size']},
            value: {none: [ '31 MB']}
        },
        {
            label: {none: ['Original modification date']},
            value: {none: [ 'July 11th 2018']}
        }
    ]);
    m.setRights('http://creativecommons.org/licenses/by-sa/3.0/');
    const n = m as any;
    let i = 0;


    const filePath = path.join(__dirname, 'elephants-dream-subtitles-en.vtt');
    const data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

    const items: any = [];
    for(const e of data.split("\r\n\r\n")) {
        if (e.trim() === 'WEBVTT') {
            continue;
        }
        const lines = e.split("\r\n");
        const t = parseInt(lines[1].substr(0, 2)) * 3600 +
            parseInt(lines[1].substr(3, 2)) * 60 +
            parseInt(lines[1].substr(6, 2));
        items.push({
            id:	ctx.request.origin + prefix + '/manifest/elephantsDream/Annotation/' + (i++).toString(),
            motivation:	"supplementing",
            type: "Annotation",
            body: {
                language: "en",
                type:	"TextualBody",
                value:	lines[2]
            },
            target:	ctx.request.origin + prefix + "/manifest/elephantsDream/canvas/arthur.mp4#t=" + t.toString()
        });
    }

    n.items[0].annotations = [
        {
            id: ctx.request.origin + prefix + '/manifest/elephantsDream/AnnotationPage',
            type: "AnnotationPage",
            items
        }
    ];

    return n;
}


