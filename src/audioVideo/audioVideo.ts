import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import Resource from "../presentation-builder/v3/Resource";
import FileManifest from "../lib/FileManifest";
import RootCollection from "../lib/RootCollection";

export function getAudioVideo(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/audioVideo';
    const c = new RootCollection(url, 'Audio & video test case');
    c.setItems([
        getDieInternationale(ctx, prefix),
        getF113(ctx, prefix),
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

