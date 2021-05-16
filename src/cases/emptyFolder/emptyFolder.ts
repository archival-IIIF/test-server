import {ParameterizedContext} from "koa";
import Collection from "../../presentation-builder/v3/Collection";
import RootCollection from "../../lib/RootCollection";
import {getIIIFRouteTree} from "../../lib/Route";

const emptyFolderContainer = (ctx: ParameterizedContext, prefix: string): Collection =>
    new RootCollection(
        ctx.request.origin + prefix + '/collection/emptyFolder',
        'Empty collection test case'
    );

const emptyFolder = (ctx: ParameterizedContext, prefix: string): Collection =>
    new RootCollection(ctx.request.origin + prefix + '/collection/emptyFolder2', 'Empty folder');

export default getIIIFRouteTree([
    {
        path: '/collection/emptyFolder',
        body: emptyFolderContainer,
        children: [
            {
                path: '/collection/emptyFolder2',
                body: emptyFolder
            },
        ]
    }
]);
