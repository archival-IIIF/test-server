import {ParameterizedContext} from "koa";
import FileManifest from "../../lib/FileManifest";
import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";


const fileWithAttribution = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const c = new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/txt',
        'File with attribution.txt',
        'Text',
        'text/plain'
    );
    c.setAttribution('Provided by Example Organization');

    return c;
}

const fileWithLicense = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const c = new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/txt', 'File with license.txt',
        'Text',
        'text/plain'
    );
    c.setRights('http://creativecommons.org/licenses/by-sa/3.0/');

    return c;
}

const fileWithoutLicense = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const c = new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/loreIpsum',
        'File without license.txt',
        'Text',
        'text/plain'
    );

    return c;
}

export default getIIIFRouteTree([
    {
        path: '/collection/rightsInformation',
        body: getCollectionBody,
        label: 'Rights information test case',
        children: [
            {
                path: '/manifest/fileWithAttribution',
                body: fileWithAttribution,
            },
            {
                path: '/manifest/fileWithLicense',
                body: fileWithLicense,
            },
            {
                path: '/manifest/fileWithoutLicense',
                body: fileWithoutLicense,
            }
        ]
    }
]);



