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
