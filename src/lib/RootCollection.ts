import {Collection} from "@archival-iiif/presentation-builder";
import Base, {Internationalized} from "@archival-iiif/presentation-builder/dist/v3/Base";

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

    setParent(id: string, type?: string, label?: Internationalized) {
        super.setParent(id, type ?? 'Collection', label);
    }
}

