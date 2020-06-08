import Resource from "../presentation-builder/v3/Resource";
import Service from "../presentation-builder/v3/Service";

export default class ThumbnailService extends Resource {

    constructor(id: string) {
        super(id, 'Image', 'image/jpeg' + '/full/!100,100/0/default.jpg');

        const service = new Service(
            id,
            "ImageService3",
            "level2"
        )

        this.setService(service);
    }
}

