import Collection from "../presentation-builder/v3/Collection";
import RootCollection from "../lib/RootCollection";
import * as Router from "koa-router";
import {addCollectionRoute} from "../lib/Route";

const router: Router = new Router();

const c1111 = new RootCollection('/collection/nestedStructure1111', 'Folder Level 1.1.1.1');
c1111.setParent('/collection/nestedStructure111', 'Collection');
addCollectionRoute(router, c1111);

const c111 = new RootCollection('/collection/nestedStructure111', 'Folder Level 1.1.1');
c111.setParent('/collection/nestedStructure11', 'Collection');
c111.setItems(c1111)
addCollectionRoute(router, c111);

const c12 = new RootCollection('/collection/nestedStructure12', 'Folder Level 1.2');
c12.setParent('/collection/nestedStructure', 'Collection');
addCollectionRoute(router, c12);

const c11 = new RootCollection( '/collection/nestedStructure11', 'Folder Level 1.1');
c11.setParent('/collection/nestedStructure', 'Collection');
c11.setItems(c111);
addCollectionRoute(router, c11);


const c1 = new RootCollection('/collection/nestedStructure', 'Folder Level 1');
c1.setItems([
    c11,
    c12
]);
addCollectionRoute(router, c1);



export default router.routes();
