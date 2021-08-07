import {Resource, Service} from "@archival-iiif/presentation-builder";

export default class ThumbnailService extends Resource {

    constructor(id: string) {
        super(id + '/full/!100,100/0/default.jpg', 'Image', 'image/jpeg');

        const service = new Service(
            id,
            "ImageService3",
            "level2"
        )

        this.setService(service);
    }
}

