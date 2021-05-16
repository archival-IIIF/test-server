import Service from "../presentation-builder/v3/Service";
import Canvas from "../presentation-builder/v3/Canvas";
import AnnotationPage from "../presentation-builder/v3/AnnotationPage";
import Resource from "../presentation-builder/v3/Resource";
import Annotation from "../presentation-builder/v3/Annotation";
import Manifest from "../presentation-builder/v3/Manifest";
import {imageSize} from "image-size";
import {basename} from "../../../viewer/src/lib/ManifestHelpers";
import ThumbnailService from "./ThumbnailService";

export default class ImageManifest2 extends Manifest {

    constructor(id: string, images: string[], label: string) {
        super(id, label);

        this.setContext('http://iiif.io/api/presentation/3/context.json');
        let baseId = id.substr(0, id.length - basename(id).length - 1);
        baseId = baseId.substr(0, baseId.length - basename(baseId).length - 1);
        this.setThumbnail(new ThumbnailService(baseId + '/image/' + basename(id) + '_0' ));

        const items: Canvas[] = [];
        let i = 0;
        for (let image of images) {
            const size = imageSize(image);
            const imageId = basename(id) + '_' + i.toString()
            const canvas = new Canvas(
                baseId + '/canvas/' + imageId,
                size.width,
                size.height
            );
            const annotationPage = new AnnotationPage(
                baseId + '/annotationPage/' + imageId
            );
            const service = new Service(
                baseId + '/image/' + imageId,
                'ImageService3',
                'level2'
            );
            const resource = new Resource(
                baseId + '/image/' + imageId + '/full/!100,100/0/default.jpg',
                'Image',
                'image/jpeg',
                size.width,
                size.height
            );
            resource.setService(service);
            const annotation = new Annotation(baseId + '/annotation', resource);
            annotation.target = baseId + '/canvas/' + imageId;
            annotationPage.setItems(annotation);
            canvas.setItems(annotationPage);
            items.push(canvas)
            i++;
        }

        this.setItems(items)
    }
}

