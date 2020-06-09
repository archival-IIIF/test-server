import Manifest from "../presentation-builder/v3/Manifest";

export default class RootManifest extends Manifest {

    constructor(id: string, label: string) {
        super(id, label);
        this.setContext('http://iiif.io/api/presentation/3/context.json');
    }
}

