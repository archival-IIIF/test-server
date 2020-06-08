import Service from "../presentation-builder/v3/Service";
import Canvas from "../presentation-builder/v3/Canvas";
import AnnotationPage from "../presentation-builder/v3/AnnotationPage";
import Resource from "../presentation-builder/v3/Resource";
import Annotation from "../presentation-builder/v3/Annotation";
import Manifest from "../presentation-builder/v3/Manifest";
import ThumbnailService from "./ThumbnailService";

export default class FileManifest extends Manifest {

    constructor(id: string, fileId: string, label: string, type: string, format: string) {
        super(id, label);


        this.setContext('http://iiif.io/api/presentation/3/context.json');

        const canvas = new Canvas(
            id + '/canvas',
            1,
            1
        );
        const annotationPage = new AnnotationPage(
            id + '/annotationPage'
        );
        const resource = new Resource(
           fileId,
            type,
            format,
        );
        const annotation = new Annotation(id + '/annotation', resource);
        annotation.target = id + '/canvas';
        annotationPage.setItems(annotation);
        canvas.setItems(annotationPage);
        canvas.setRendering({
            id: fileId,
            label: {
                none: [label]
            },
            format,
            type
        })
        this.setItems(canvas)
    }
}

