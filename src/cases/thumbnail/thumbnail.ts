import {ParameterizedContext} from "koa";
import Collection from "../../presentation-builder/v3/Collection";
import Resource from "../../presentation-builder/v3/Resource";
import FileManifest from "../../lib/FileManifest";
import Service from "../../presentation-builder/v3/Service";
import RootCollection from "../../lib/RootCollection";

export function getThumbnail(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/thumbnail';
    const c = new RootCollection(url, 'Thumbnail test case');
    c.setItems([
        getFolderWithThumbnail(ctx, prefix),
        getFolderWithoutThumbnail(ctx, prefix),
        getFolderWithThumbnailService(ctx, prefix),
        getFileWithoutThumbnail(ctx, prefix),
    ]);

    return c;
}

export function getFolderWithThumbnail(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/folderWithThumbnail';
    const c = new RootCollection(url, 'Folder with thumbnail');
    c.setParent(ctx.request.origin + prefix + '/collection/thumbnail', 'Collection');
    c.setThumbnail(new Resource(
        ctx.request.origin + '/file-icon/folder.svg',
        'Image',
        'image/svg+xml'
    ));

    return c;
}

export function getFolderWithoutThumbnail(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/folderWithoutThumbnail';
    const c = new RootCollection(url, 'Folder without thumbnail');
    c.setParent(ctx.request.origin + prefix + '/collection/thumbnail', 'Collection');

    return c;
}

export function getFolderWithThumbnailService(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/folderWithThumbnailService';
    const c = new RootCollection(url, 'Folder with image thumbnail service');
    c.setParent(ctx.request.origin + prefix + '/collection/thumbnail', 'Collection');
    const service = new Service(
        ctx.request.origin + '/image-service/v3/ariel',
        'ImageService3',
        'level2'
    );
    c.setThumbnail(new Resource(
        ctx.request.origin + '/image-service/v3/ariel/full/!100,100/0/default.jpg',
        'Image',
        'image/jpeg'
    ));

    return c;
}


export function getFileWithoutThumbnail(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/fileWithoutThumbnail';
    const m = new FileManifest(url, ctx.request.origin + '/file/pdf1', 'File without thumbnail.pdf', 'Text', 'application/pdf');
    m.setParent(ctx.request.origin + prefix + '/collection/thumbnail', 'Collection');

    return m;
}
