import {ParameterizedContext} from "koa";
import Collection from "../presentation-builder/v3/Collection";
import CollectionItem from "../lib/CollectionItem";
import FileManifest from "../lib/FileManifest";

export function getLanguage(ctx: ParameterizedContext, prefix: string) {
    const url = ctx.request.origin + prefix + '/collection/language';
    const c = new Collection(url, 'Language test case');
    c.setItems([
        new CollectionItem(getLanguageFile1(ctx, prefix)),
        new CollectionItem(getLanguageFile2(ctx, prefix)),
        new CollectionItem(getLanguageFile3(ctx, prefix)),
        new CollectionItem(getLanguageFile4(ctx, prefix)),
        new CollectionItem(getLanguageFile5(ctx, prefix)),
    ]);

    return c;
}

export function getLanguageFilePresentation(ctx: ParameterizedContext, prefix: string, fileId: string, label: string) {
    const url = ctx.request.origin + prefix + '/manifest/' + fileId;
    const m = new FileManifest(
        url,
        ctx.request.origin + '/file/' + fileId,
        label,
        'Text',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    m.setParent(ctx.request.origin + prefix + '/collection/language', 'Collection');

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