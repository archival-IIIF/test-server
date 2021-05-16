import {getCollectionBody, getIIIFRouteTree,} from "../../lib/Route";


export default getIIIFRouteTree([
    {
        path: '/collection/nestedStructure',
        body: getCollectionBody,
        label: 'Folder Level 1',
        children: [
            {
                path: '/collection/nestedStructure11',
                body: getCollectionBody,
                label: 'Folder Level 1.1',
                children: [
                    {
                        path: '/collection/nestedStructure111',
                        body: getCollectionBody,
                        label: 'Folder Level 1.1.1',
                        children: [
                            {
                                path: '/collection/nestedStructure1111',
                                body: getCollectionBody,
                                label: 'Folder Level 1.1.1.1'
                            }
                        ]
                    }
                ]
            },
            {
                path: '/collection/nestedStructure12',
                body: getCollectionBody,
                label: 'Folder Level 1.2'
            },
        ]
    }
]);
