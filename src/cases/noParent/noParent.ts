import {getIIIFRouteTree, getImageBody} from "../../lib/Route";

export default getIIIFRouteTree([
    {
        path: '/manifest/noParent',
        body: getImageBody,
        label: 'Ariel_-_LoC_4a15521.jpg',
        images: [__dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg']
    }
]);
