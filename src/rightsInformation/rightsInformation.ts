import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import CollectionItem from "../lib/CollectionItem";
import FileManifest from "../lib/FileManifest";

export function getRightsInformation(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/rightsInformation';
    const c = new Collection(url, 'Rights information test case');
    c.setRights('http://creativecommons.org/licenses/by-sa/3.0/'),
    c.setItems([
        new CollectionItem(getFileWithAttribution(ctx, prefix)),
        new CollectionItem(getFileWithLicense(ctx, prefix)),
        new CollectionItem(getFileWithoutLicense(ctx, prefix)),
    ]);

    return c;
}

export function getFileWithAttribution(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/fileWithAttribution';
    const c = new FileManifest(url, ctx.request.origin + '/file/txt', 'File with attribution.txt', 'Text', 'text/plain');
    c.setAttribution('Provided by Example Organization');
    c.setParent(ctx.request.origin + prefix + '/collection/rightsInformation', 'Collection');

    return c;
}

export function getFileWithLicense(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/fileWithLicense';
    const c = new FileManifest(url, ctx.request.origin + '/file/loreIpsum', 'File with license.txt', 'Text', 'text/plain');
    c.setRights('http://creativecommons.org/licenses/by-sa/3.0/');
    c.setParent(ctx.request.origin + prefix + '/collection/rightsInformation', 'Collection');

    return c;
}

export function getFileWithoutLicense(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/manifest/fileWithoutLicense';
    const c = new FileManifest(url, ctx.request.origin + '/file/loreIpsum', 'File without license.txt', 'Text', 'text/plain');
    c.setParent(ctx.request.origin + prefix + '/collection/rightsInformation', 'Collection');

    return c;
}

