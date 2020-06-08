import * as Router from 'koa-router';
import Collection from "../presentation-builder/v3/Collection";
import Manifest from "../presentation-builder/v3/Manifest";
import {Ref} from "../presentation-builder/v3/Base";
import ThumbnailService from "../lib/ThumbnailService";
import Canvas from "../presentation-builder/v3/Canvas";
import AnnotationPage from "../presentation-builder/v3/AnnotationPage";
import Annotation from "../presentation-builder/v3/Annotation";
import Resource from "../presentation-builder/v3/Resource";
import Service from "../presentation-builder/v3/Service";
import ImageManifest from "../lib/ImageManifest";
import {ParameterizedContext} from "koa";
import CollectionItem from "../lib/CollectionItem";

const prefix = '/iiif/v3';
const router: Router = new Router({prefix});
const imageWith = 1840;
const imageHeight = 1450;


router.get('/collection/multiPage', ctx => {

    const c = new Collection(ctx.request.origin + ctx.request.url, 'Image test case');
    c.setContext('http://iiif.io/api/presentation/3/context.json');
    c.setRights('http://creativecommons.org/licenses/by-sa/3.0/');
    c.setItems(new CollectionItem(getMultiPage1(ctx)));
    ctx.body = c;

});

router.get('/manifest/multiPage1', ctx => {
    ctx.body = getMultiPage1(ctx);
});

const metadata = [
    {
        label: {en: ["Original file type"]},
        value: {none: ["<a href=\"https://www.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=729\">Windows Bitmap (.bmp, .dib)</a>"]}
    },
    {
        label: {en: ["Original file size"]},
        value: {none: ["1.28 MB"]}
    },
    {
        label: {en: ["Original modification date"]},
        value: {none: ["March 1st 2012"]}
    }
];

function getMultiPage1(ctx: ParameterizedContext): Manifest {
    const m = new ImageManifest(
        ctx.request.origin + prefix + '/manifest/multiPage1',
        [ctx.request.origin + '/image-service/v3/ariel', ctx.request.origin + '/image-service/v3/arielDark'],
        'Ariel_-_LoC_4a15521.jpg',
        imageWith,
        imageHeight
    );
    m.setParent(ctx.request.origin + prefix + '/collection/multiPage', 'Collection');
    m.setMetadata(metadata);

    return m;
}

export default router.routes();
