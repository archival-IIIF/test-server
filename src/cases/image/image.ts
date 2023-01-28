import {getIIIFRouteTree, getImageBody} from "../../lib/Route";
import {defaultImage} from "../../lib/Image";


export default getIIIFRouteTree([
    {
        path: '/manifest/image',
        body: getImageBody,
        label: 'Ariel_-_LoC_4a15521.jpg',
        images: defaultImage
    }
]);
