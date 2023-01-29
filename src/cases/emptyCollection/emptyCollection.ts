import RootCollection from "../../lib/RootCollection";
import {getIIIFRouteTree} from "../../lib/Route";
import getBaseUrl from "../../lib/BaseUrl";


export default getIIIFRouteTree([
    {
        path: '/collection/emptyCollection',
        body: (ctx) => new RootCollection(
            getBaseUrl(ctx) + ctx.request.url,
            'Empty collection test case'
        )
    }
]);
