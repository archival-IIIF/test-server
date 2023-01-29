import {ParameterizedContext} from "koa";
import {Resource} from "@archival-iiif/presentation-builder";
import FileManifest from "../../lib/FileManifest";
import RootCollection from "../../lib/RootCollection";
import * as path from "path";
import * as fs from "fs";
import {getIIIFRouteTree} from "../../lib/Route";
import getBaseUrl from "../../lib/BaseUrl";


const audioVideoContainer = (ctx: ParameterizedContext, prefix: string) => new RootCollection(
    getBaseUrl(ctx) + prefix + '/collection/audioVideo',
    'Audio & video test case'
);

const dieInternationale = (ctx: ParameterizedContext, prefix: string) => {
    const m = new FileManifest(
        getBaseUrl(ctx) + prefix + '/manifest/die_internationale_as_mp3',
        getBaseUrl(ctx) + '/file/die_internationale_as_mp3',
        'Die_Internationale as mp3.mp3',
        'Audio',
        'audio/mp3'
    );
    m.setThumbnail(new Resource(getBaseUrl(ctx) + '/file-icon/mp3.svg', 'Image', 'image/svg+xml'));
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
    m.setRights('https://creativecommons.org/licenses/by-sa/3.0/');

    return m;
};

const f113 = (ctx: ParameterizedContext, prefix: string) => {
    const url = getBaseUrl(ctx) + prefix + '/manifest/f113';
    const m = new FileManifest(url, getBaseUrl(ctx) + '/file/f113', 'F113.mp4', 'Video', 'video/mp4');
    m.setThumbnail(new Resource(getBaseUrl(ctx) + '/file-icon/mp4.svg', 'Image', 'image/svg+xml'));
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
    m.setRights('https://creativecommons.org/licenses/by-sa/3.0/');

    return m;
}

const elephantsDream = (ctx: ParameterizedContext, prefix: string) => {
    const url = getBaseUrl(ctx) + prefix + '/manifest/elephantsDream';
    const m = new FileManifest(url, getBaseUrl(ctx) + '/file/elephantsDream', 'elephants-dream-medium.webm', 'Video', 'video/webm');
    m.setThumbnail(new Resource(getBaseUrl(ctx) + '/file-icon/mp4.svg', 'Image', 'image/svg+xml'));
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
    m.setRights('https://creativecommons.org/licenses/by-sa/3.0/');
    const n = m as any;
    let i = 0;


    const filePath = path.join(__dirname, 'elephants-dream-subtitles-en.vtt');
    const data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

    const items: any = [];
    for(const e of data.split("\n\n")) {
        if (e.trim() === 'WEBVTT') {
            continue;
        }
        const lines = e.split("\n");
        if (lines.length < 3) {
            continue;
        }
        const t = parseInt(lines[1].slice(0, 2)) * 3600 +
            parseInt(lines[1].slice(3, 5)) * 60 +
            parseInt(lines[1].slice(6, 8));
        items.push({
            id:	getBaseUrl(ctx) + prefix + '/manifest/elephantsDream/Annotation/' + (i++).toString(),
            motivation:	"supplementing",
            type: "Annotation",
            body: {
                language: "en",
                type:	"TextualBody",
                value:	lines[2]
            },
            target:	getBaseUrl(ctx) + prefix + "/manifest/elephantsDream/canvas/arthur.mp4#t=" + t.toString()
        });
    }

    n.items[0].annotations = [
        {
            id: getBaseUrl(ctx) + prefix + '/manifest/elephantsDream/AnnotationPage',
            type: "AnnotationPage",
            items
        }
    ];

    return n;
}

export default getIIIFRouteTree([
    {
        path: '/collection/audioVideo',
        body: audioVideoContainer,
        children: [
            {
                path: '/manifest/die_internationale_as_mp3',
                body: dieInternationale,
            },
            {
                path: '/manifest/f113',
                body: f113,
            },
            {
                path: '/manifest/elephantsDream',
                body: elephantsDream,
            },
        ]
    }
]);
