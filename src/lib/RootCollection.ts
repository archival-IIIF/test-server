import {Collection, Manifest} from "@archival-iiif/presentation-builder";
import Base, {Internationalized} from "@archival-iiif/presentation-builder/dist/v3/Base";

export default class RootCollection extends Collection {

    constructor(id: string, label: string) {
        super(id, label);
        this.setContext('http://iiif.io/api/presentation/3/context.json');
    }

    setParent(id: string, type?: string, label?: Internationalized) {
        super.setParent(id, type ?? 'Collection', label);
    }
}

