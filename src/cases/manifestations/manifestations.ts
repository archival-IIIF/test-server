import {ParameterizedContext} from "koa";
import {Resource} from "@archival-iiif/presentation-builder";
import FileManifest from "../../lib/FileManifest";
import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";


const manifestation = (ctx: ParameterizedContext, prefix: string, path: string) => {
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
    const m = new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/manifestation/access',
        'test.pdf',
        'Text',
        'application/pdf',
        renderings
    );
    m.setParent(ctx.request.origin + prefix + '/collection/manifestations', 'Collection');
    m.setThumbnail(new Resource(ctx.request.origin + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));


    return m;
}

export default getIIIFRouteTree([
    {
        path: '/collection/manifestations',
        body: getCollectionBody,
        label: 'manifestation test case',
        children: [
            {
                path: '/collection/manifestation',
                body: manifestation
            },
        ]
    }
]);

