import * as Router from 'koa-router';
import {
    getNestedStructure,
    getNestedStructure11,
    getNestedStructure111,
    getNestedStructure1111,
    getNestedStructure12
} from "./nestedStructure";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/nestedStructure', ctx => {
    ctx.body = getNestedStructure(ctx, prefix);
});

router.get('/collection/nestedStructure11', ctx => {
    ctx.body = getNestedStructure11(ctx, prefix);
});

router.get('/collection/nestedStructure111', ctx => {
    ctx.body = getNestedStructure111(ctx, prefix);
});

router.get('/collection/nestedStructure1111', ctx => {
    ctx.body = getNestedStructure1111(ctx, prefix);
});

router.get('/collection/nestedStructure12', ctx => {
    ctx.body = getNestedStructure12(ctx, prefix);
});


export default router.routes();
