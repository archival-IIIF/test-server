import {Collection} from "@archival-iiif/presentation-builder";
import {Internationalized} from "@archival-iiif/presentation-builder/v3";

export default class RootCollection extends Collection {

    constructor(id: string, label: string) {
        super(id, label);
        this.setContext('http://iiif.io/api/presentation/3/context.json');
    }

    setParent(id: string, type?: string, label?: Internationalized) {
        super.setParent(id, type ?? 'Collection', label);
    }
}

