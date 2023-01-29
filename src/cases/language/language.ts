import {ParameterizedContext} from "koa";
import FileManifest from "../../lib/FileManifest";
import {getCollectionBody, getIIIFRouteTree} from "../../lib/Route";
import getBaseUrl from "../../lib/BaseUrl";


export function getLanguageFilePresentation(ctx: ParameterizedContext, prefix: string, fileId: string, label: string) {
    const url = getBaseUrl(ctx) + prefix + '/manifest/' + fileId;
    const m = new FileManifest(
        url,
        getBaseUrl(ctx) + '/file/' + fileId,
        label,
        'Text',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    m.setParent(getBaseUrl(ctx) + prefix + '/collection/language', 'Collection');

    return m;
}

export function getLanguageFile1(ctx: ParameterizedContext, prefix: string) {
    return getLanguageFilePresentation(ctx, prefix, 'languageFile1', 'colecções digitais afluência.docx');
}

export function getLanguageFile2(ctx: ParameterizedContext, prefix: string) {
    return getLanguageFilePresentation(ctx, prefix, 'languageFile2', 'Приток цифровых коллекций.docx');
}

export function getLanguageFile3(ctx: ParameterizedContext, prefix: string) {
    return getLanguageFilePresentation(ctx, prefix, 'languageFile3', 'مجموعه های دیجیتال جریان.docx');
}

export function getLanguageFile4(ctx: ParameterizedContext, prefix: string) {
    return getLanguageFilePresentation(ctx, prefix, 'languageFile4', 'অন্তর্বাহ ডিজিটাল সংগ্রহ.docx');
}

export function getLanguageFile5(ctx: ParameterizedContext, prefix: string) {
    return getLanguageFilePresentation(ctx, prefix, 'languageFile5', '流入數字館藏.docx');
}


export default getIIIFRouteTree([
    {
        path: '/collection/language',
        body: getCollectionBody,
        label: 'Language test case',
        children: [
            {
                path: '/manifest/languageFile1',
                body: getLanguageFile1
            },
            {
                path: '/manifest/languageFile2',
                body: getLanguageFile2
            },
            {
                path: '/manifest/languageFile3',
                body: getLanguageFile3
            },
            {
                path: '/manifest/languageFile4',
                body: getLanguageFile4
            },
            {
                path: '/manifest/languageFile5',
                body: getLanguageFile5
            },
        ]
    }
]);

