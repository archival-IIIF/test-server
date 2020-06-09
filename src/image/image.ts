import {ParameterizedContext} from "koa";
import Manifest from "../presentation-builder/v3/Manifest";
import ImageManifest from "../lib/ImageManifest";
import Collection from "../presentation-builder/v3/Collection";
import CollectionItem from "../lib/CollectionItem";

const imageWith = 1840;
const imageHeight = 1450;

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

export function getImage(ctx: ParameterizedContext, prefix: string): Manifest {
    const c = new Collection(ctx.request.origin + ctx.request.url, 'Image test case');
    c.setContext('http://iiif.io/api/presentation/3/context.json');
    c.setRights('http://creativecommons.org/licenses/by-sa/3.0/');
    c.setItems(new CollectionItem(getAriel(ctx, prefix)));

    return c;
}


export function getAriel(ctx: ParameterizedContext, prefix: string): Manifest {
    const m = new ImageManifest(
        ctx.request.origin + prefix + '/manifest/ariel',
        ctx.request.origin + '/image-service/v2/ariel',
        'Ariel_-_LoC_4a15521.jpg',
        imageWith,
        imageHeight
    );
    m.setParent(ctx.request.origin + prefix + '/collection/image', 'Collection');
    m.setMetadata(metadata);

    return m;
}

