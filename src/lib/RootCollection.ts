import Collection from "../presentation-builder/v3/Collection";
import Base, {Ref} from "../presentation-builder/v3/Base";

export default class RootCollection extends Collection {

    constructor(id: string, label: string) {
        super(id, label);
        this.setContext('http://iiif.io/api/presentation/3/context.json');
    }

    setItems(items: Base | Base[]) {

        if (!Array.isArray(items)) {
            items = [items];
        }

        const children = [];
        for (const item of items) {
            const child = new Base(item.id, item.type, item.label);
            child.thumbnail = item.thumbnail;
            children.push(child);
        }

        super.setItems(children);
    }
}

