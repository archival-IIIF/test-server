import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import CollectionItem from "../lib/CollectionItem";
import Resource from "../presentation-builder/v3/Resource";
import FileManifest from "../lib/FileManifest";

export function getPdf(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/pdf';
    const c = new Collection(url, 'PDF test case');
    c.setItems([
        new CollectionItem(getPdf1(ctx, prefix)),
        new CollectionItem(getDocx(ctx, prefix)),
        new CollectionItem(getPdfa(ctx, prefix)),
    ]);

    return c;
}

export function getPdf1(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/pdf1';
    const m = new FileManifest(url, ctx.request.origin + '/file/pdf1', 'test.pdf', 'Text', 'application/pdf');
    m.setParent(ctx.request.origin + prefix + '/collection/pdf', 'Collection');
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));


    return m;
}

export function getDocx(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/docx';
    const m = new FileManifest(
        url,
        ctx.request.origin + '/file/docx',
        'test.docx',
        'Text',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    m.setParent(ctx.request.origin + prefix + '/collection/pdf', 'Collection');
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/docx.svg', 'Image', 'image/svg+xml'));


    return m;
}

export function getPdfa(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/pdfa';
    const m = new FileManifest(
        url,
        ctx.request.origin + '/file/pdfa',
        'pdfa.pdf',
        'Text',
        'application/pdf'
    );
    m.setParent(ctx.request.origin + prefix + '/collection/pdf', 'Collection');
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));


    return m;
}
