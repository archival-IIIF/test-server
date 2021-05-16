import {getCollectionBody, getIIIFRouteTree, getImageBody} from "../../lib/Route";


export default getIIIFRouteTree([
    {
        path: '/collection/image',
        body: getCollectionBody,
        label: 'Image test case',
        children: [
            {
                path: '/manifest/image1',
                body: getImageBody,
                label: 'Ariel_-_LoC_4a15521.jpg',
                images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg']
            },
            {
                path: '/manifest/image2',
                label: 'Ariel_-_LoC_4a15521_dark.jpg',
                body: getImageBody,
                images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521_dark.jpg']
            }
        ]
    }
]);
