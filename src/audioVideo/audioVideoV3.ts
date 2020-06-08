import * as Router from 'koa-router';

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/audioVideo', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Collection',
        label: {none: ['Audio & video test case']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        items: [
            {
                id: ctx.request.origin + prefix + '/manifest/die_internationale_as_mp3',
                type: 'Manifest',
                label:  {none: ['Die Internationale as mp3.mp3']},
                thumbnail: [{
                    id: ctx.request.origin + '/file-icon/mp3.svg',
                    format: 'image/svg+xml',
                    type: 'Image',
                }]
            },
            {
                id: ctx.request.origin + prefix + '/manifest/f113',
                type: 'Manifest',
                label: {none: ['F113.mp4']},
                thumbnail: [{
                    id: ctx.request.origin + '/file-icon/mp4.svg',
                    type: 'Image',
                    format: 'image/svg+xml'
                }]
            }
        ]
    };
});


router.get('/manifest/die_internationale_as_mp3', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {none: ['Die_Internationale as mp3.mp3']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        partOf: [{id: ctx.request.origin + prefix + '/collection/audioVideo', type: 'Collection'}],
        metadata: [
            {
                label: {none: ['Original file type']},
                value: {none: [ '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=687\">MPEG 1/2 Audio Layer 3 (.mp3)</a>']}
            },
            {
                label: {none: ['Original file size']},
                value: {none: [ '242.04 KB']}
            },
            {
                label: {none: ['Original modification date']},
                value: {none: [ 'July 11th 2018']}
            }
        ],
        thumbnail: [{
            id: ctx.request.origin + '/file-icon/mp3.svg',
            format: 'image/svg+xml',
            type: 'Image'
        }],
        items: [
            {
                id: ctx.request.origin + '/canvas/die_internationale_as_mp3',
                type: 'Canvas',
                duration: 15.464,
                items: [
                    {
                        id: ctx.request.origin + '/annotationPage/die_internationale_as_mp3',
                        type: 'AnnotationPage',
                        items: [
                            {
                                id: ctx.request.origin + '/annotation/die_internationale_as_mp3',
                                type: 'Annotation',
                                motivation: 'painting',
                                body: {
                                    id: ctx.request.origin + '/file/die_internationale_as_mp3',
                                    type: 'Audio',
                                    format: 'audio/mp3',
                                    duration: 15.464
                                },
                                target: ctx.request.origin + '/canvas/die_internationale_as_mp3'
                            }
                        ]
                    }
                ]
            }
        ]
    };
});

router.get('/manifest/f113', ctx => {
    ctx.body = {
        id: ctx.request.origin + ctx.request.url,
        type: 'Manifest',
        label: {none: ['F113.mp4']},
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        rights: 'http://creativecommons.org/licenses/by-sa/3.0/',
        partOf: [{id: ctx.request.origin + prefix + '/collection/audioVideo', type: 'Collection'}],
        metadata: [
            {
                label: {none: ['Original file type']},
                value: {none: [ '<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=924\">MPEG-4 Media File (.f4a, .f4v, .m4a, .m4v, .mp4)</a>']}
            },
            {
                label: {none: ['Original file size']},
                value: {none: [ '6.86 MB']}
            },
            {
                label: {none: ['Original modification date']},
                value: {none: [ 'July 11th 2018']}
            }
        ],
        thumbnail: [{
            id: ctx.request.origin + '/file-icon/mp3.svg',
            format: 'image/svg+xml',
            type: 'Image'
        }],
        items: [
            {
                id: ctx.request.origin + '/canvas/f113',
                type: 'Canvas',
                height: 360,
                width: 640,
                items: [
                    {
                        id: ctx.request.origin + '/annotationPage/f113',
                        type: 'AnnotationPage',
                        items: [
                            {
                                id: ctx.request.origin + '/annotation/f113',
                                type: 'Annotation',
                                motivation: 'painting',
                                body: {
                                    id: ctx.request.origin + '/file/f113',
                                    type: 'Video',
                                    height: 360,
                                    width: 640,
                                    format: 'video/mp4'
                                },
                                target: ctx.request.origin + '/canvas/f113'
                            }
                        ]
                    }
                ]
            }
        ]
    };
});

export default router.routes();
