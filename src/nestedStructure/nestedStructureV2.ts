import * as Router from 'koa-router';
import {
    getNestedStructure,
    getNestedStructure11,
    getNestedStructure111,
    getNestedStructure1111,
    getNestedStructure12
} from "./nestedStructure";
import {transformCollectionToV2} from "../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/nestedStructure', ctx => {
    ctx.body = transformCollectionToV2(getNestedStructure(ctx, prefix));
});

router.get('/collection/nestedStructure11', ctx => {
    ctx.body = transformCollectionToV2(getNestedStructure11(ctx, prefix));
});

router.get('/collection/nestedStructure111', ctx => {
    ctx.body = transformCollectionToV2(getNestedStructure111(ctx, prefix));
});

router.get('/collection/nestedStructure1111', ctx => {
    ctx.body = transformCollectionToV2(getNestedStructure1111(ctx, prefix));
});

router.get('/collection/nestedStructure12', ctx => {
    ctx.body = transformCollectionToV2(getNestedStructure12(ctx, prefix));
});


export default router.routes();
