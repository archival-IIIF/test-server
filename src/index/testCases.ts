export const testCases = {
    "General": [
        {
            "uri": "manifest/image",
            "label": "Image",
            "uv": true
        },
        {
            "uri": "manifest/multiPage",
            "label": "Multi page item",
            "uv": true
        },
        {
            "uri": "manifest/metadata",
            "label": "Image with metadata",
            "uv": true
        },
        {
            "uri": "manifest/multiLang",
            "label": "Image with metadata in different languages",
            "uv": true
        },
        {
            "uri": "manifest/logo",
            "label": "Image with a logo",
            "uv": true
        },
        {
            "uri": "manifest/rightsInformation",
            "label": "Image case with license",
            "uv": true
        },
        {
            "uri": "manifest/attribution",
            "label": "Image with attribution",
            "uv": true
        },
        {
            "uri": "manifest/rendering",
            "label": "Image with rendering (see download)",
            "uv": true
        },
        {
            "uri": "manifest/provider",
            "label": "Image with provider information",
            "uv": true
        },
        {
            "uri": "collection/homepage",
            "label": "Image with homepage"
        },
        {
            "uri": "collection/audioVideo",
            "label": "Audio and video files",
            "uv": true
        },
        {
            "uri": "collection/thumbnail",
            "label": "Different thumbnail settings",
            "uv": true
        },
        {
            "uri": "collection/language",
            "label": "Text files with file names in different writing systems",
            "uv": true
        },
        {
            "uri": "collection/encoding",
            "label": "Text files with different file encodings"
        },
        {
            "uri": "collection/pdf",
            "label": "PDF files",
            "uv": true
        },
        {
            "uri": "collection/manifestations",
            "label": "File with two manifestations",
            "uv": true
        }
    ],
    "Collection": [
        {
            "uri": "collection/emptyCollection",
            "label": "Empty collection"
        },
        {
            "uri": "collection/emptyFolder",
            "label": "Empty sub collection"
        },
        {
            "uri": "collection/nestedStructure",
            "label": "Nested structure"
        }
    ],
    "Authentication": [
        {
            "uri": "collection/authLogin",
            "label": "Token login test case with a locked collection"
        },
        {
            "uri": "collection/authLoginRestrictedLabels",
            "label": "Token login test case with locked labels"
        },
        {
            "uri": "collection/authLoginRestrictedLabels2",
            "label": "Locked labels without additional manifest (non-standard)"
        },
        {
            "uri": "collection/authInfo",
            "label": "Token login test case with a locked info.json",
            "uv": true
        },
        {
            "uri": "collection/authExternalAccept",
            "label": "External auth test (accept)"
        },
        {
            "uri": "collection/authExternalDeny",
            "label": "External auth test (deny)"
        },
        {
            "uri": "collection/authClickThrough",
            "label": "Click-through auth test"
        },
        {
            "uri": "collection/authKiosk",
            "label": "Kiosk auth test"
        },
        {
            "uri": "collection/authMixed",
            "label": "Mixed test with login and click-through auth"
        }
    ],
    "Invalid manifests": [
        {
            "uri": "collection/missingManifest",
            "label": "Missing manifest"
        },
        {
            "uri": "collection/noJson",
            "label": "No json output"
        },
        {
            "uri": "collection/noId",
            "label": "Missing id in manifest"
        },
        {
            "uri": "collection/nolabel",
            "label": "Missing label in manifest"
        },
        {
            "uri": "collection/wrongManifestType",
            "label": "Wrong manifest type"
        },
        {
            "uri": "collection/missingSubfolder",
            "label": "Missing sub collection"
        },
        {
            "uri": "collection/missingParent",
            "label": "Missing parent in manifest"
        },
        {
            "uri": "collection/missingInfoJson",
            "label": "Missing info.json"
        },
        {
            "uri": "collection/loop",
            "label": "Loop"
        }
    ]
}
