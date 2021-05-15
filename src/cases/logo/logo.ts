import {ParameterizedContext} from "koa";
import Collection from "../../presentation-builder/v3/Collection";
import Resource from "../../presentation-builder/v3/Resource";
import FileManifest from "../../lib/FileManifest";
import RootCollection from "../../lib/RootCollection";

export function getLogo(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/logo';
    const c = new RootCollection(url, 'Logo test case');
    c.setItems([
        getFileWithLogo(ctx, prefix),
        getFileWithoutLogo(ctx, prefix),
    ]);
    c.setLogo(new Resource(
        ctx.request.origin + '/logo',
        'Image',
        'image/jpeg',
        120,
        120
    ));

    return c;
}

export function getFileWithLogo(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/fileWithLogo';
    const m = new FileManifest(url, ctx.request.origin + '/file/txt', 'File with logo.txt', 'Text', 'text/plain');
    m.setParent(ctx.request.origin + prefix + '/collection/logo', 'Collection');
    m.setLogo(new Resource(
        ctx.request.origin + '/logo',
        'Image',
        'image/jpeg',
        120,
        120
    ));


    return m;
}

export function getFileWithoutLogo(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/fileWithoutLogo';
    const m = new FileManifest(url, ctx.request.origin + '/file/txt', 'File without logo.txt', 'Text', 'text/plain');
    m.setParent(ctx.request.origin + prefix + '/collection/logo', 'Collection');

    return m;
}

