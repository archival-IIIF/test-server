import Base from "../presentation-builder/v3/Base";
import Collection from "../presentation-builder/v3/Collection";
import Manifest from "../presentation-builder/v3/Manifest";

export default class CollectionItem extends Base {

    constructor(item: Manifest | Collection) {
        super(item.id, item.type, item.label);

        this.thumbnail = item.thumbnail;
    }
}

