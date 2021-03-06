import CollectionV3 from "../presentation-builder/v3/Collection";
import CollectionV2 from "../presentation-builder/v2/Collection";
import ManifestV3 from "../presentation-builder/v3/Manifest";
import ManifestV2 from "../presentation-builder/v2/Manifest";
import {Internationalized as InternationalizedV3, Ref as RefV3} from "../presentation-builder/v3/Base";
import ResourceV2 from "../presentation-builder/v2/Resource";
import ImageV2 from "../presentation-builder/v2/Image";
import SequenceV2 from "../presentation-builder/v2/Sequence";
import CanvasV2 from "../presentation-builder/v2/Canvas";
import AnnotationV2 from "../presentation-builder/v2/Annotation";
import RenderingV2 from "../presentation-builder/v2/Rendering";
import CanvasV3 from "../presentation-builder/v3/Canvas";
import AnnotationV3 from "../presentation-builder/v3/Annotation";
import ResourceV3 from "../presentation-builder/v3/Resource";
import FileManifest from "./FileManifest";
import MediaSequenceV2 from "../presentation-builder/v2/MediaSequence";
import BaseV3 from "../presentation-builder/v3/Base";
import BaseV2 from "../presentation-builder/v2/Base";
import ServiceV3 from "../presentation-builder/v3/Service";
import AuthServiceV2 from "../presentation-builder/v2/AuthService";
import AuthServiceV3 from "../presentation-builder/v3/AuthService";

export function transformCollectionToV2(c3: CollectionV3): CollectionV2 {

    const c2 = new CollectionV2(c3.id, c3.label[Object.keys(c3.label)[0]][0]);
    baseTransformation(c2, c3);

    if (c3.items) {
        for(const item of c3.items) {
            if (item.type === 'Manifest') {
                c2.addManifest(transformRefToV2(item))
            }
            if (item.type === 'Collection') {
                c2.addCollection(transformRefToV2(item))
            }
        }
    }

    return c2;
}

export function transformManifestToV2(m3: ManifestV3): ManifestV2 {

    const m2 = new ManifestV2(m3.id, getInternational(m3.label));
    baseTransformation(m2, m3);

    const sequence2: SequenceV2 = new SequenceV2(m3.id + '/sequence', null);
    const mediaSequence2 = new MediaSequenceV2(m3.id + '/sequence', null);

    for (const item of m3.items) {
        const itemAny: any = item;
        const canvas3: CanvasV3 = itemAny;
        const annotation3: AnnotationV3 = itemAny.items[0].items[0];
        if (annotation3.body.type === 'Image') {
            const resource2: ResourceV2 = new ResourceV2(annotation3.body.id, canvas3.width, canvas3.height, annotation3.body.format)
            const imageService2 = new ImageV2(
                annotation3.body.service[0].id.replace('/v3/', '/v2/'),
                canvas3.width,
                canvas3.height
            );
            if (imageService2.profile === 'level2') {
                imageService2.profile = 'http://iiif.io/api/image/2/level2.json'
            }
            resource2.setService(imageService2);
            const annotation: AnnotationV2 = new AnnotationV2(annotation3.id, resource2);
            annotation.on = canvas3.id;
            const canvas2: CanvasV2 = new CanvasV2(item.id, annotation);
            sequence2.addCanvas(canvas2);
        } else if (annotation3.body.type === 'Audio' || annotation3.body.type === 'Video') {
            const resource2: ResourceV2 = new ResourceV2(
                annotation3.body.id,
                canvas3.width,
                canvas3.height,
                annotation3.body.format,
                'foaf:Document'
            );

            if (annotation3.body.format)

                if (canvas3.rendering && canvas3.rendering.length > 0) {
                    for (const rendering3 of canvas3.rendering) {
                        resource2.addRendering(
                            new RenderingV2(rendering3.id, getInternational(rendering3.label), rendering3.format)
                        );
                    }
                }

            mediaSequence2.addElement(resource2);
        } else {
            const resource2: ResourceV2 = new ResourceV2(
                annotation3.body.id,
                canvas3.width,
                canvas3.height,
                annotation3.body.format,
                'foaf:Document'
            );
            if (annotation3.body.format)

                if (canvas3.rendering && canvas3.rendering.length > 0) {
                    for (const rendering3 of canvas3.rendering) {
                        resource2.addRendering(
                            new RenderingV2(rendering3.id, getInternational(rendering3.label), rendering3.format)
                        );
                    }
                }

            mediaSequence2.addElement(resource2);
        }
    }
    if (sequence2.canvases) {
        m2.setSequence(sequence2);
    }
    if (mediaSequence2.elements) {
        m2.setMediaSequence(mediaSequence2);
    }

    return m2;
}


export function transformRefToV2(m3: RefV3): any {
    const m2 = new ManifestV2(m3.id, getInternational(m3.label));
    const any: any = m3;
    m2.setThumbnail(transformThumbnailToV2(any.thumbnail));
    return m2;
}

export function transformThumbnailToV2(thumbnail?: ResourceV3[]): ResourceV2 {
    if (!thumbnail || thumbnail.length === 0) {
        return undefined;
    }

    const thumbnail3 = thumbnail[0];

    const thumbnail2 = new ResourceV2(thumbnail3.id, thumbnail3.width, thumbnail3.height, thumbnail3.format,
        thumbnail3.type);
    if (thumbnail3.service && thumbnail3.service.length > 0) {
        const thumbnailService3 = thumbnail3.service[0];
        const thumbnailService2 = new ImageV2(thumbnailService3.id, 200, 100);
        if (thumbnailService3.profile === 'level') {
            thumbnailService2.profile = 'http://iiif.io/api/image/2/level2.json'
        }
        thumbnail2.setService(thumbnailService2);
    }

    return thumbnail2;
}

function getInternational(int: InternationalizedV3) {
    return int[Object.keys(int)[0]][0];
}
export function transformServiceToV2(serviceV3?: AuthServiceV3 | AuthServiceV3[] | ServiceV3 | ServiceV3[]):
    BaseV2[] | undefined {

    if (!serviceV3) {
        return undefined;
    }

    if (!Array.isArray(serviceV3)) {
        serviceV3 = [serviceV3];
    }

    const serviceV2: BaseV2[] = [];
    for (const s3 of serviceV3) {

        let s2 = new AuthServiceV2(s3.id, s3.type);

        if (s3 instanceof AuthServiceV3) {
            s2.label = s3.label;
            s2.header = s3.header;
            s2.description = s3.description;
            s2.confirmLabel = s3.confirmLabel;
            s2.failureHeader = s3.failureHeader;
            s2.failureDescription = s3.failureDescription;
        }

        s2.profile = s3.profile;

        if (s3.service) {
            s2.setService(transformServiceToV2(s3.service))
        }
        serviceV2.push(s2);
    }

    if (serviceV2.length === 0) {
        return undefined;
    }

    return serviceV2;
}

function baseTransformation(v2: BaseV2, v3: BaseV3) {
    if (v3.logo && v3.logo.length > 0) {
        const logo = v3.logo[0];
        v2.setLogo(new ResourceV2(logo.id, logo.width, logo.height, logo.format, logo.type));
    }
    v2.setLicense(v3.rights);
    if (v3.requiredStatement && v3.requiredStatement.value) {
        v2.setAttribution(getInternational(v3.requiredStatement.value));
    }

    if (v3.metadata) {
        for (const metaData of v3.metadata) {
            v2.addMetadata(getInternational(metaData.label), getInternational(metaData.value));
        }
    }

    if (v3['@context'] === 'http://iiif.io/api/presentation/3/context.json') {
        v2['@context'] = 'http://iiif.io/api/collection/2/context.json';
    }

    if (v3.partOf && v3.partOf.length > 0) {
        v2.within = v3.partOf[0].id;
    }


    v2.setThumbnail(transformThumbnailToV2(v3.thumbnail));
    v2.setService(transformServiceToV2(v3.service));
}
