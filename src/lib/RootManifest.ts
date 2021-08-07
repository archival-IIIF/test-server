import {Manifest} from "@archival-iiif/presentation-builder";

export default class RootManifest extends Manifest {

    constructor(id: string, label: string) {
        super(id, label);
        this.setContext('http://iiif.io/api/presentation/3/context.json');
    }
}

