import {ParameterizedContext} from "koa";
import Resource from "../../presentation-builder/v3/Resource";
import FileManifest from "../../lib/FileManifest";
import RootCollection from "../../lib/RootCollection";
import {getIIIFRouteTree} from "../../lib/Route";


const logoContainer = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const c = new RootCollection(ctx.request.origin + prefix + path, 'Logo test case');
    c.setLogo(new Resource(
        ctx.request.origin + '/logo',
        'Image',
        'image/jpeg',
        120,
        120
    ));

    return c;
}


const fileWithLogo = (ctx: ParameterizedContext, prefix: string, path: string) => {
    const m = new FileManifest(
        ctx.request.origin + prefix + path,
        ctx.request.origin + '/file/txt', 'File with logo.txt',
        'Text',
        'text/plain'
    );
    m.setLogo(new Resource(
        ctx.request.origin + '/logo',
        'Image',
        'image/jpeg',
        120,
        120
    ));


    return m;
}

const fileWithoutLogo = (ctx: ParameterizedContext, prefix: string, path: string) =>
    new FileManifest(ctx.request.origin + prefix + path, ctx.request.origin + '/file/txt', 'File without logo.txt', 'Text', 'text/plain');



export default getIIIFRouteTree([
    {
        path: '/collection/logo',
        body: logoContainer,
        label: 'Empty collection test case',
        children: [
            {
                path: '/collection/fileWithLogo',
                body: fileWithLogo
            },
            {
                path: '/collection/fileWithoutLogo',
                body: fileWithoutLogo
            },
        ]
    }
]);




