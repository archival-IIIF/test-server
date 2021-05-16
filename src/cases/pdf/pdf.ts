import {ParameterizedContext} from "koa";
import Resource from "../../presentation-builder/v3/Resource";
import FileManifest from "../../lib/FileManifest";
import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";



const pdf1 = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const m = new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/pdf1', 'test.pdf',
        'Text',
        'application/pdf'
    );
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));


    return m;
}

const docx = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const m = new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/docx',
        'test.docx',
        'Text',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/docx.svg', 'Image', 'image/svg+xml'));


    return m;
}

const pdfa = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const m = new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/pdfa',
        'pdfa.pdf',
        'Text',
        'application/pdf'
    );
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));


    return m;
}

export default getIIIFRouteTree([
    {
        path: '/collection/pdf',
        body: getCollectionBody,
        label: 'PDF test case',
        children: [
            {
                path: '/manifest/pdf1',
                body: pdf1,
            },
            {
                path: '/manifest/docx',
                body: docx,
            },
            {
                path: '/manifest/pdfa',
                body: pdfa,
            }
        ]
    }
]);

