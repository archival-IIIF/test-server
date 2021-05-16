import {getIIIFRouteTree, getCollectionBody} from "../../lib/Route";

export default getIIIFRouteTree([
    {
        path: '/collection/emptyFolder',
        body: getCollectionBody,
        label: 'Empty collection test case',
        children: [
            {
                path: '/collection/emptyFolder2',
                label: 'Empty folder',
                body: getCollectionBody
            },
        ]
    }
]);
