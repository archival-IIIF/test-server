import {Service, Canvas, AnnotationPage, Resource, Annotation, Manifest} from "@archival-iiif/presentation-builder";
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
        let i = 1;
        for (let imageServiceId0 of imageServiceIds) {
            const canvas = new Canvas(
                id + '/' + i.toString() + '/canvas',
                imageWith,
                imageHeight
            );
            const annotationPage = new AnnotationPage(
                id + '/' + i.toString() + '/annotationPage'
            );
            const service = new Service(
                imageServiceId0,
                'ImageService3',
                'level2'
            );
            const resource = new Resource(
                imageServiceId0 + '/full/!100,100/0/default.jpg',
                'Image',
                undefined,
                'image/jpeg',
                undefined,
                imageWith,
                imageHeight
            );
            resource.setService(service);
            const annotation = new Annotation(id + '/annotation', resource);
            annotation.target = id + '/' + i.toString() +'/canvas';
            annotationPage.setItems(annotation);
            canvas.setItems(annotationPage);
            items.push(canvas)
            i++;
        }

        this.setItems(items)
    }
}

