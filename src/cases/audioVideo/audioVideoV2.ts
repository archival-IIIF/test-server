import * as Router from 'koa-router';
import {getAudioVideo, getDieInternationale, getElephantsDream, getF113} from "./audioVideo";
import {transformCollectionToV2, transformFileManifestToV2} from "../../lib/Transform";

const prefix = '/iiif/v2';
const router: Router = new Router({prefix});

router.get('/collection/audioVideo', ctx => {
    ctx.body = transformCollectionToV2(getAudioVideo(ctx, prefix));
});

router.get('/manifest/die_internationale_as_mp3', ctx => {
    ctx.body = transformFileManifestToV2(getDieInternationale(ctx, prefix));
});

router.get('/manifest/f113', ctx => {
    ctx.body = transformFileManifestToV2(getF113(ctx, prefix));
});

router.get('/manifest/elephantsDream', ctx => {
    ctx.body = transformFileManifestToV2(getElephantsDream(ctx, prefix));
});

export default router.routes();
