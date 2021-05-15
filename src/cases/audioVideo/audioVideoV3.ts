import * as Router from 'koa-router';
import {getAudioVideo, getDieInternationale, getElephantsDream, getF113} from "./audioVideo";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});

router.get('/collection/audioVideo', ctx => {
    ctx.body = getAudioVideo(ctx, prefix);
});

router.get('/manifest/die_internationale_as_mp3', ctx => {
    ctx.body = getDieInternationale(ctx, prefix);
});

router.get('/manifest/f113', ctx => {
    ctx.body = getF113(ctx, prefix);
});

router.get('/manifest/elephantsDream', ctx => {
    ctx.body = getElephantsDream(ctx, prefix);
});

export default router.routes();
