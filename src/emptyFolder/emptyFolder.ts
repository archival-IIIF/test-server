import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import RootCollection from "../lib/RootCollection";

export function getEmptyFolderContainer(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/emptyFolder';
    const c = new RootCollection(url, 'Empty collection test case');
    c.setItems(getEmptyFolder(ctx, prefix));

    return c;
}

export function getEmptyFolder(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/emptyFolder2';
    const c = new RootCollection(url, 'Empty folder');
    c.setParent(ctx.request.origin + prefix + '/collection/emptyFolder', 'Collection')

    return c;
}
