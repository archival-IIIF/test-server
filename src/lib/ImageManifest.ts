import Service from "../presentation-builder/v3/Service";
import Canvas from "../presentation-builder/v3/Canvas";
import AnnotationPage from "../presentation-builder/v3/AnnotationPage";
import Resource from "../presentation-builder/v3/Resource";
import Annotation from "../presentation-builder/v3/Annotation";
import Manifest from "../presentation-builder/v3/Manifest";
import ThumbnailService from "./ThumbnailService";

export default class ImageManifest extends Manifest {

    constructor(id: string, imageServiceId: string | string[], label: string, imageWith: number, imageHeight: number) {
        super(id, label);

        let imageServiceIds: string[];
        if (typeof imageServiceId === 'string') {
            imageServiceIds = [imageServiceId];
        } else {
            imageServiceIds = imageServiceId;
        }

        this.setContext('http://iiif.io/api/presentation/3/context.json');
        this.setThumbnail(new ThumbnailService(imageServiceIds[0]));

        const items: Canvas[] = [];
        for (let imageServiceId0 of imageServiceIds) {
            const canvas = new Canvas(
                id + '/canvas',
                imageWith,
                imageHeight
            );
            const annotationPage = new AnnotationPage(
                id + '/annotationPage'
            );
            const service = new Service(
                imageServiceId0,
                'ImageService3',
                'level2'
            );
            const resource = new Resource(
                imageServiceId + '/full/!100,100/0/default.jpg',
                'Image',
                'image/jpg',
            );
            resource.setService(service);
            const annotation = new Annotation(id + '/annotation', resource);
            annotation.target = id + '/canvas';
            annotationPage.setItems(annotation);
            canvas.setItems(annotationPage);
            items.push(canvas)
        }

        this.setItems(items)
    }
}

