import RootCollection from "../../lib/RootCollection";
import * as Router from "koa-router";
import {addCollectionRoute} from "../../lib/Route";

const router: Router = new Router();

const c1111 = new RootCollection('/collection/nestedStructure1111', 'Folder Level 1.1.1.1');

const c111 = new RootCollection('/collection/nestedStructure111', 'Folder Level 1.1.1');
c111.setItems(c1111)
c1111.setParent(c111.id);

const c12 = new RootCollection('/collection/nestedStructure12', 'Folder Level 1.2');

const c11 = new RootCollection( '/collection/nestedStructure11', 'Folder Level 1.1');
c11.setItems(c111);
c111.setParent(c11.id);

const c1 = new RootCollection('/collection/nestedStructure', 'Folder Level 1');
c1.setItems([c11, c12]);
c11.setParent(c1.id);
c12.setParent(c1.id);


addCollectionRoute(router, c1);
addCollectionRoute(router, c11);
addCollectionRoute(router, c111);
addCollectionRoute(router, c1111);
addCollectionRoute(router, c12);


export default router.routes();
