import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import RootCollection from "../lib/RootCollection";

export function getNestedStructure(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/nestedStructure';
    const c = new RootCollection(url, 'Folder Level 1');
    c.setItems([
        getNestedStructure11(ctx, prefix),
        getNestedStructure12(ctx, prefix)
    ]);

    return c;
}

export function getNestedStructure11(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/nestedStructure11';
    const c = new RootCollection(url, 'Folder Level 1.1');
    c.setParent(ctx.request.origin + prefix + '/collection/nestedStructure', 'Collection');
    c.setItems(getNestedStructure111(ctx, prefix));

    return c;
}

export function getNestedStructure12(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/nestedStructure12';
    const c = new RootCollection(url, 'Folder Level 1.2');
    c.setParent(ctx.request.origin + prefix + '/collection/nestedStructure', 'Collection');

    return c;
}

export function getNestedStructure111(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/nestedStructure111';
    const c = new RootCollection(url, 'Folder Level 1.1.1');
    c.setParent(ctx.request.origin + prefix + '/collection/nestedStructure11', 'Collection');
    c.setItems(getNestedStructure1111(ctx, prefix))

    return c;
}

export function getNestedStructure1111(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/nestedStructure1111';
    const c = new RootCollection(url, 'Folder Level 1.1.1.1');
    c.setParent(ctx.request.origin + prefix + '/collection/nestedStructure111', 'Collection');

    return c;
}
