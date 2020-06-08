import * as Router from 'koa-router';
import Collection from "../presentation-builder/v3/Collection";
import {ParameterizedContext} from "koa";
import {transformCollectionToV2} from "../lib/Transform";

const router: Router = new Router();

router.get('/iiif/v2/collection/emptyCollection', ctx => {
    ctx.body = transformCollectionToV2(getEmptyCollection(ctx));
});

router.get('/iiif/v3/collection/emptyCollection', ctx => {
    ctx.body = getEmptyCollection(ctx);
});

function getEmptyCollection(ctx: ParameterizedContext) {
    return new Collection(ctx.request.origin + ctx.request.url, 'Empty collection test case')
}

export default router.routes();
