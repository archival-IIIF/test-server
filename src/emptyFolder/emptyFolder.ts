import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import CollectionItem from "../lib/CollectionItem";

export function getEmptyFolderContainer(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/emptyFolder';
    const c = new Collection(url, 'Empty collection test case');
    c.setItems(new CollectionItem(getEmptyFolder(ctx, prefix)))

    return c;
}

export function getEmptyFolder(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/emptyFolder2';
    const c = new Collection(url, 'Empty folder');
    c.setParent(ctx.request.origin + prefix + '/collection/emptyFolder', 'Collection')

    return c;
}
