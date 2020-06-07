import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/nestedStructure', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Folder Level 1']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        items: [
            {
                id: ctx.request.origin + prefix + '/collection/nestedStructure11',
                type: 'Collection',
                label: {en: ['Folder Level 1.1']}
            },
            {
                id: ctx.request.origin + prefix + '/collection/nestedStructure12',
                type: 'Collection',
                label: {en: ['Folder Level 1.2']}
            }
        ]
    };
});

router.get('/collection/nestedStructure11', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: 'Folder Level 1.1',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: ctx.request.origin + prefix + '/collection/nestedStructure',
        collections: [
            {
                id: ctx.request.origin + prefix + '/collection/nestedStructure111',
                type: 'Collection',
                label: {en: ['Folder Level 1.1.1']}
            }
        ]
    };
});

router.get('/collection/nestedStructure111', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: 'Folder Level 1.1.1',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: ctx.request.origin + prefix + '/collection/nestedStructure11',
        collections: [
            {
                id: ctx.request.origin + prefix + '/collection/nestedStructure1111',
                type: 'Collection',
                label: {en: ['Folder Level 1.1.1.1']}
            }
        ]
    };
});

router.get('/collection/nestedStructure1111', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: 'Folder Level 1.1.1.1',
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: ctx.request.origin + prefix + '/collection/nestedStructure111',
    };
});

router.get('/collection/nestedStructure12', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {en: ['Folder Level 1.2']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        partOf: ctx.request.origin + prefix + '/collection/nestedStructure',
    };
});

export default router.routes();
