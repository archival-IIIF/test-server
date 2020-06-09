import {ParameterizedContext} from "koa";
import Manifest from "../presentation-builder/v3/Manifest";
import ImageManifest from "../lib/ImageManifest";
import Collection from "../presentation-builder/v3/Collection";
import RootCollection from "../lib/RootCollection";

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

export function getMultiPage(ctx: ParameterizedContext, prefix: string): Manifest {
   const c = new RootCollection(ctx.request.origin + ctx.request.url, 'Multi page test case');
   c.setRights('http://creativecommons.org/licenses/by-sa/3.0/');
   c.setItems(getMultiPage1(ctx, prefix));

   return c;
}


export function getMultiPage1(ctx: ParameterizedContext, prefix: string): Manifest {
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

