import {ParameterizedContext} from "koa";
import {Resource} from "@archival-iiif/presentation-builder";
import FileManifest from "../../lib/FileManifest";
import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";
import getBaseUrl from "../../lib/BaseUrl";


const manifestation = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const renderings = [
        {
            id: getBaseUrl(ctx) + '/file/manifestation/access',
            label: {none: ['test.pdf (Access copy)']},
            type: 'Text',
            format: 'application/pdf'
        },
        {
            id: getBaseUrl(ctx) + '/file/manifestation/original',
            label: {none: ['test.docx (Original file)']},
            type: 'Text',
            format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
    ];
    const m = new FileManifest(
        getBaseUrl(ctx) + prefix + path,
        getBaseUrl(ctx) + '/file/manifestation/access',
        'test.pdf',
        'Text',
        'application/pdf',
        renderings
    );
    m.setParent(getBaseUrl(ctx) + prefix + '/collection/manifestations', 'Collection');
    m.setThumbnail(new Resource(getBaseUrl(ctx) + '/file-icon/pdf.svg', 'Image', 'image/svg+xml'));


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

