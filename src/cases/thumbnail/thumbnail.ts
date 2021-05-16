import {ParameterizedContext} from "koa";
import Resource from "../../presentation-builder/v3/Resource";
import FileManifest from "../../lib/FileManifest";
import Service from "../../presentation-builder/v3/Service";
import RootCollection from "../../lib/RootCollection";
import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";
import ThumbnailService from "../../lib/ThumbnailService";


const folderWithThumbnail = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const c = new RootCollection(ctx.request.origin + prefix + path, 'Folder with thumbnail');
    c.setThumbnail(new Resource(
        ctx.request.origin + '/file-icon/folder.svg',
        'Image',
        'image/svg+xml'
    ));

    return c;
}

const folderWithoutThumbnail = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new RootCollection(ctx.request.origin + prefix + path, 'Folder without thumbnail');

const folderWithThumbnailService = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const c = new RootCollection(ctx.request.origin + prefix + path, 'Folder with image thumbnail service');
    c.setThumbnail(new ThumbnailService(ctx.request.origin + prefix + '/image/image1_0'));

    return c;
}


const fileWithoutThumbnail = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/pdf1',
        'File without thumbnail.pdf',
        'Text',
        'application/pdf'
    );



export default getIIIFRouteTree([
    {
        path: '/collection/thumbnail',
        body: getCollectionBody,
        label: 'Thumbnail test case',
        children: [
            {
                path: '/manifest/folderWithThumbnail',
                body: folderWithThumbnail,
            },
            {
                path: '/manifest/folderWithoutThumbnail',
                body: folderWithoutThumbnail,
            },
            {
                path: '/manifest/folderWithThumbnailService',
                body: folderWithThumbnailService,
            },
            {
                path: '/manifest/fileWithoutThumbnail',
                body: fileWithoutThumbnail,
            }
        ]
    }
]);

