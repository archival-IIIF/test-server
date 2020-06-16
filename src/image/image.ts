import * as Router from 'koa-router';
import {transformCollectionToV2} from "../lib/Transform";
import {addArialRoute, addImageRoute, getArielBase} from "../imageService/imageBase";
import {ParameterizedContext} from "koa";
import Manifest from "../presentation-builder/v3/Manifest";
import RootCollection from "../lib/RootCollection";

const router: Router = new Router();

let prefix = '/iiif/v2';
router.get(prefix + '/collection/image', ctx => {
    ctx.body = transformCollectionToV2(getImage(ctx, prefix));
});

prefix = '/iiif/v3';
router.get(prefix + '/collection/image', ctx => {
    ctx.body = getImage(ctx, prefix);
});

addArialRoute(router, 'ariel', '/collection/image')
addImageRoute(router, 'arielDark', '/collection/image',
    __dirname + '/Ariel_-_LoC_4a15521_dark.jpg')

function getImage(ctx: ParameterizedContext, prefix: string): Manifest {
    const c = new RootCollection(ctx.request.origin + ctx.request.url, 'Image test case');
    c.setRights('http://creativecommons.org/licenses/by-sa/3.0/');
    c.setItems(getArielBase(ctx, prefix, '/manifest/ariel', '/collection/image'));

    return c;
}

export default router.routes();
