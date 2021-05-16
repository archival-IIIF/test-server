import RootCollection from "../../lib/RootCollection";
import {getIIIFRouteTree} from "../../lib/Route";


export default getIIIFRouteTree([
    {
        path: '/collection/emptyCollection',
        body: (ctx) => new RootCollection(
            ctx.request.origin + ctx.request.url,
            'Empty collection test case'
        )
    }
]);
