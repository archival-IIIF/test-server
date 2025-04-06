import {Service, Canvas, AnnotationPage, Resource, Annotation, Manifest} from "@archival-iiif/presentation-builder";
import {imageSize} from "image-size";
import {basename} from "./helper";
import ThumbnailService from "./ThumbnailService";
import {Internationalize} from "@archival-iiif/presentation-builder/v3";
import { readFileSync } from 'node:fs'

export default class ImageManifest2 extends Manifest {

    constructor(id: string, images: string[], label: Internationalize) {
        super(id, label);

        this.setContext('http://iiif.io/api/presentation/3/context.json');
        let baseId = id.substr(0, id.length - basename(id).length - 1);
        baseId = baseId.substr(0, baseId.length - basename(baseId).length - 1);
        this.setThumbnail(new ThumbnailService(baseId + '/image/' + basename(id) + '_0' ));

        const items: Canvas[] = [];
        let i = 0;
        for (let image of images) {
            // https://github.com/image-size/image-size?tab=readme-ov-file#reading-from-a-file-syncronously-not-recommended-%EF%B8%8F
            const buffer = readFileSync(image)
            const size = imageSize(buffer)
            const imageId = basename(id) + '_' + i.toString()
            const canvas = new Canvas(
                baseId + '/canvas/' + imageId,
                '',
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
                undefined,
                'image/jpeg',
                undefined,
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

