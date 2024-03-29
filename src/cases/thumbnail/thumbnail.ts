import {ParameterizedContext} from "koa";
import {Resource} from "@archival-iiif/presentation-builder";
import FileManifest from "../../lib/FileManifest";
import RootCollection from "../../lib/RootCollection";
import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";
import ThumbnailService from "../../lib/ThumbnailService";
import getBaseUrl from "../../lib/BaseUrl";


const folderWithThumbnail = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const c = new RootCollection(getBaseUrl(ctx) + prefix + path, 'Folder with thumbnail');
    c.setThumbnail(new Resource(
        getBaseUrl(ctx) + '/file-icon/folder.svg',
        'Image',
        'image/svg+xml'
    ));

    return c;
}

const folderWithoutThumbnail = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new RootCollection(getBaseUrl(ctx) + prefix + path, 'Folder without thumbnail');

const folderWithThumbnailService = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const c = new RootCollection(getBaseUrl(ctx) + prefix + path, 'Folder with image thumbnail service');
    c.setThumbnail(new ThumbnailService(getBaseUrl(ctx) + prefix + '/image/image1_0'));

    return c;
}


const fileWithoutThumbnail = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new FileManifest(
        getBaseUrl(ctx) + prefix + path,
        getBaseUrl(ctx) + '/file/pdf1',
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

