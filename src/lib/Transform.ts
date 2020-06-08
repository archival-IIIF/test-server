import CollectionV3 from "../presentation-builder/v3/Collection";
import CollectionV2 from "../presentation-builder/v2/Collection";
import ManifestV3 from "../presentation-builder/v3/Manifest";
import ManifesV2 from "../presentation-builder/v2/Manifest";
import {Internationalized as InternationalizedV3, Ref as RefV3} from "../presentation-builder/v3/Base";
import ResourceV2 from "../presentation-builder/v2/Resource";
import ImageV2 from "../presentation-builder/v2/Image";
import BaseV2, {Ref} from "../presentation-builder/v2/Base";
import SequenceV2 from "../presentation-builder/v2/Sequence";
import CanvasV2 from "../presentation-builder/v2/Canvas";
import AnnotationV2 from "../presentation-builder/v2/Annotation";
import CanvasV3 from "../presentation-builder/v3/Canvas";
import AnnotationV3 from "../presentation-builder/v3/Annotation";
import ResourceV3 from "../presentation-builder/v3/Resource";
import FileManifest from "./FileManifest";
import MediaSequenceV2 from "../presentation-builder/v2/MediaSequence";

export function transformCollectionToV2(c3: CollectionV3): CollectionV2 {

    const c2 = new CollectionV2(c3.id, c3.label[Object.keys(c3.label)[0]][0]);
    c2.license = c3.rights;
    if (c3['@context'] === 'http://iiif.io/api/presentation/3/context.json') {
        c2['@context'] = 'http://iiif.io/api/collection/2/context.json';
    }

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

    if (c3.logo && c3.logo.length > 0) {
        const logo = c3.logo[0];
        c2.setLogo(new ResourceV2(logo.id, logo.width, logo.height, logo.format, logo.type));
    }

    return c2;
}

export function transformManifestToV2(m3: ManifestV3): ManifesV2 {

    const m2 = new ManifesV2(m3.id, getInternational(m3.label));
    m2.setThumbnail(transformThumbnailToV2(m3.thumbnail));
    if (m3.partOf && m3.partOf.length > 0) {
        m2.within = m3.partOf[0].id;
    }

    if (m3.logo && m3.logo.length > 0) {
        const logo = m3.logo[0];
        m2.setLogo(new ResourceV2(logo.id, logo.width, logo.height, logo.format, logo.type));
    }

    m2.setLicense(m3.rights);
    if (m3.requiredStatement && m3.requiredStatement.value) {
        m2.setAttribution(getInternational(m3.requiredStatement.value));
    }

    if (m3.metadata) {
        for (const metaData of m3.metadata) {
            m2.addMetadata(getInternational(metaData.label), getInternational(metaData.value));
        }
    }

    return m2;
}

export function transformImageManifestToV2(m3: ManifestV3): ManifesV2 {

    const m2 = transformManifestToV2(m3);
    const sequence2: SequenceV2 = new SequenceV2(m3.id + '/sequence', null);
    for (const item of m3.items) {
        const itemAny: any = item;
        const canvas3: CanvasV3 = itemAny;
        const annotation3: AnnotationV3 = itemAny.items[0].items[0];

        const resource2: ResourceV2 = new ResourceV2(annotation3.body.id, canvas3.width, canvas3.height, annotation3.body.format)
        const imageService2 = new ImageV2(annotation3.body.service[0].id, canvas3.width, canvas3.height);
        if (imageService2.profile === 'level') {
            imageService2.profile = 'http://iiif.io/api/image/2/level2.json'
        }
        resource2.setService(imageService2);
        const annotation: AnnotationV2 = new AnnotationV2(annotation3.id, resource2);
        annotation.on = canvas3.id;
        const canvas2: CanvasV2 = new CanvasV2(item.id, annotation);
        sequence2.addCanvas(canvas2);
    }
    m2.setSequence(sequence2);

    if (m3.metadata) {
        for (const metaData of m3.metadata) {
            m2.addMetadata(getInternational(metaData.label), getInternational(metaData.value));
        }
    }

    return m2;
}

export function transformFileManifestToV2(m3: FileManifest): ManifesV2 {

    const m2 = transformManifestToV2(m3);
    m2.setThumbnail(transformThumbnailToV2(m3.thumbnail));
    if (m3.partOf && m3.partOf.length > 0) {
        m2.within = m3.partOf[0].id;
    }
    const mediaSequence2 = new MediaSequenceV2(m3.id + '/sequence', null);
    for (const item of m3.items) {
        const itemAny: any = item;
        const canvas3: CanvasV3 = itemAny;
        const annotation3: AnnotationV3 = itemAny.items[0].items[0];
        const resource2: ResourceV2 = new ResourceV2(annotation3.body.id, canvas3.width, canvas3.height, annotation3.body.format)
        mediaSequence2.addElement(resource2);
    }
    m2.setMediaSequence(mediaSequence2);

    if (m3.metadata) {
        for (const metaData of m3.metadata) {
            m2.addMetadata(getInternational(metaData.label), getInternational(metaData.value));
        }
    }

    return m2;
}

export function transformRefToV2(m3: RefV3): any {

    const m2 = new ManifesV2(m3.id, getInternational(m3.label));
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
