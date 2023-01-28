import {getIIIFRouteTree, getImageBody} from "../../lib/Route";


export default getIIIFRouteTree([
   {
      path: '/manifest/multiPage',
      body: getImageBody,
      label: 'Ariel_-_LoC_4a15521.jpg',
      images: [
         __dirname + '/../../imageService/Ariel_-_LoC_4a15521.jpg',
         __dirname + '/../../imageService/Ariel_-_LoC_4a15521_dark.jpg'
      ]
   }
]);

