import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import Resource from "../presentation-builder/v3/Resource";
import FileManifest from "../lib/FileManifest";
import RootCollection from "../lib/RootCollection";

export function getManifestations(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/manifestations';
    const c = new RootCollection(url, 'manifestation test case');
    c.setItems([
        getManifestation(ctx, prefix),
    ]);

    return c;
}

export function getManifestation(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/manifestation';
    const renderings = [
        {
            id: ctx.request.origin + '/file/manifestation/access',
            label: {none: ['test.pdf (Access copy)']},
            type: 'Text',
            format: 'application/pdf'
        },
        {
            id: ctx.request.origin + '/file/manifestation/original',
            label: {none: ['test.docx (Original file)']},
            type: 'Text',
            format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
    ];
    const m = new FileManifest(url, ctx.request.origin + '/file/manifestation/access', 'test.pdf', 'Text', 'application/pdf', renderings);
    m.setParent(ctx.request.origin + prefix + '/collection/manifestations', 'Collection');
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));


    return m;
}
