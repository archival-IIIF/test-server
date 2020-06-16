import {ParameterizedContext} from "koa";
import Manifest from "../presentation-builder/v3/Manifest";
import ImageManifest from "../lib/ImageManifest";
import Collection from "../presentation-builder/v3/Collection";
import AuthService from "../presentation-builder/v3/AuthService";
import ThumbnailService from "../lib/ThumbnailService";
import * as Router from "koa-router";
import {hasAccess} from "../lib/Security";
import {transformImageManifestToV2} from "../lib/Transform";
import {responseFile} from "./imageService";
import {imageSize} from "image-size";
import {basename} from "path";

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

export function getArielBase(
    ctx: ParameterizedContext,
    prefix: string,
    idPath: string,
    parentPath?: string,
    service?: AuthService,
    locked?: boolean,
): Manifest {
    let imageServicePath = '/image-service/v3/ariel';

    const name = idPath.replace('/manifest/', '');

    return getImageManifest(
        ctx,
        prefix,
        name,
        parentPath,
        'Ariel_-_LoC_4a15521.jpg',
        imageServicePath,
        service,
        locked,
    );
}

export function getImageManifest(
    ctx: ParameterizedContext,
    prefix: string,
    name: string,
    parentPath: string,
    label: string,
    imageServicePath: string,
    service?: AuthService,
    locked?: boolean,
): Manifest {
    const m = new ImageManifest(
        ctx.request.origin + prefix + '/manifest/' + name,
        ctx.request.origin + imageServicePath,
        label,
        imageWith,
        imageHeight
    );
    if (parentPath) {
        m.setParent(ctx.request.origin + prefix + parentPath, 'Collection');
    }
    if (service) {
        m.setService(service);
    }

    m.setMetadata(metadata);

    if (locked === true) {
        ctx.status = 401;
    }

    return m;
}


export function getArielManifestChild(ctx: ParameterizedContext, prefix: string, name: string,): Manifest {
    let imageServicePath = '/image-service/'+prefix.replace('/iiif/', '')+'/' + name;
    const m = new Manifest(
        ctx.request.origin + prefix + '/manifest/' + name,
        'Ariel_-_LoC_4a15521.jpg',
    );
    m.setThumbnail(new ThumbnailService(ctx.request.origin + imageServicePath));

    return m;
}

export function addArialRoute(
    router: Router,
    name: string,
    parentPath: string,
    authServiceFunction?: (ctx: ParameterizedContext) => AuthService,
    cookieName?: string,
    cookieToken?: string,
    viewerToken?: string
) {
    const filePath = __dirname + '/Ariel_-_LoC_4a15521.jpg';
    return addImageRoute(router, name, parentPath, filePath, undefined, authServiceFunction, cookieName, cookieToken,
        viewerToken)
}


export function addImageRoute(
    router: Router,
    name: string,
    parentPath: string,
    filePath: string,
    label?: string,
    authServiceFunction?: (ctx: ParameterizedContext) => AuthService,
    cookieName?: string,
    cookieToken?: string,
    viewerToken?: string
) {
    const versions = ['v2', 'v3'];
    for (const version of versions) {

        const prefix = '/iiif/' + version;
        const imagePath = '/image-service/' + version + '/' + name;
        router.get( prefix +'/manifest/' + name, ctx => {
            let locked;
            if (cookieName && cookieToken && viewerToken) {
                locked = !hasAccess(ctx, cookieName, cookieToken, viewerToken);
            }
            const authService = authServiceFunction ? authServiceFunction(ctx) : undefined;
            const ariel = getImageManifest(
                ctx,
                prefix,
                name,
                parentPath,
                label ? label : basename(filePath),
                imagePath,
                authService,
                locked,
            );

            if (version === 'v2') {
                ctx.body = transformImageManifestToV2(ariel);
            } else {
                ctx.body = ariel;
            }
        });

        router.get(imagePath, ctx => {
            ctx.status = 301;
            ctx.redirect(ctx.request.origin + imagePath + '/info.json');
            ctx.body = 'Redirecting to info.json';
        });

        const dimensions = imageSize(filePath);
        const width = dimensions.width;
        const height = dimensions.height;

        router.get(imagePath + '/info.json', ctx => {
            if (version === 'v2') {
                ctx.body = infoV2(ctx.request.origin + imagePath, width, height);
            } else {
                ctx.body = infoV3(ctx.request.origin + imagePath, width, height);
            }
        });

        router.get(imagePath + '/:region/:size/:rotation/:quality.:format', async ctx => {
            if (cookieName && cookieToken && viewerToken && !hasAccess(ctx, cookieName, cookieToken, viewerToken)) {
                ctx.status = 401;
                return;
            }

            await responseFile(ctx, filePath, width, height);
        });
    }
}

export function infoV2(id: string, width: number, height: number): any {

    return {
        '@id': id,
        protocol: "http://iiif.io/api/image",
        width,
        height,
        sizes: [],
        "@context": "http://iiif.io/api/image/2/context.json",
        profile: [
            "http://iiif.io/api/image/2/level2.json",
            {
                supports: ["canonicalLinkHeader", "profileLinkHeader", "mirroring", "rotationArbitrary", "regionSquare"],
                qualities: ["default", "color", "gray", "bitonal"],
                formats: ["jpg", "png", "gif", "webp"]
            }
        ]
    };
}

export function infoV3(id: string, width: number, height: number) {
    return {
        id,
        type: "ImageService3",
        protocol: "http://iiif.io/api/image",
        width,
        height,
        profile: 'level2',
        "@context": "http://iiif.io/api/image/3/context.json",
        preferredFormats: [ "jpg"],
        extraFormats: ["jpg", "png", "gif", "webp"],
        extraFeatures: ["canonicalLinkHeader", "profileLinkHeader", "mirroring", "rotationArbitrary", "regionSquare"],
        extraQualities: ["default", "color", "gray", "bitonal"]
    };
}

