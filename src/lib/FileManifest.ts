import {Canvas, AnnotationPage, Resource, Annotation, Manifest} from "@archival-iiif/presentation-builder";
import {Internationalize} from "@archival-iiif/presentation-builder/v3";


type I18nExtendedRef = { id?: string; type?: string; label?: Internationalize; format?: string; profile?: string; };

export default class FileManifest extends Manifest {

    constructor(id: string, fileId: string, label: string, type: string, format: string,
                rendering?: I18nExtendedRef | I18nExtendedRef[]) {
        super(id, label);


        this.setContext('http://iiif.io/api/presentation/3/context.json');

        const canvas = new Canvas(id + '/canvas', '', 1, 1);
        const annotationPage = new AnnotationPage(id + '/annotationPage');
        const resource = new Resource(fileId, type, format);
        const annotation = new Annotation(id + '/annotation', resource);
        annotation.target = id + '/canvas';
        annotationPage.setItems([annotation]);
        canvas.setItems([annotationPage]);
        if (rendering) {
            canvas.setRendering(rendering);
        } else {
            canvas.setRendering({
                id: fileId,
                label: {none: [label]},
                format,
                type
            });
        }

        this.setItems([canvas]);
    }
}

