import { Transport } from "../transport";
import {
    EPageType,
    IClientFooter,
    IClientHeader,
    IClientPageBody,
    ICreatePageRequest,
    ICreatePageResponse,
    IDictionary,
    IIdResponse,
    IPage,
    IPageAuthor,
    IPagesTableRow,
    TBuildPageRequest,
    TLang,
} from "../entities";
import { ApiPaths } from "../config";

export function fetchPageStatusList(transport: Transport) {
    return transport.get<IDictionary[]>(ApiPaths.GET_PAGE_STATUSES);
}

export function fetchPageList(transport: Transport, lang: TLang, type: EPageType) {
    return transport.get<IPagesTableRow[]>(ApiPaths.GET_PAGE_LIST, { lang, type });
}

export function createPage(
    transport: Transport,
    data: ICreatePageRequest,
    lang: TLang,
    type: EPageType,
) {
    return transport.post<ICreatePageRequest, ICreatePageResponse>(ApiPaths.CREATE_PAGE, data, {
        lang,
        type,
    });
}

export function fetchPage(transport: Transport, id: string) {
    return transport.get<IPage>(ApiPaths.PAGE.replace(":id", id));
}

export function fetchPageAuthor(transport: Transport, id: string) {
    return transport.get<IPageAuthor>(ApiPaths.GET_PAGE_AUTHOR.replace(":id", id));
}

export function updatePage(transport: Transport, id: string, data: Partial<IPage>) {
    return transport.put<Partial<IPage>, IPage>(ApiPaths.PAGE.replace(":id", id), data);
}

export function deletePage(transport: Transport, id: string) {
    return transport.delete(ApiPaths.PAGE.replace(":id", id));
}

export function buildPage(transport: Transport, id: string) {
    return transport.put<TBuildPageRequest, IIdResponse>(ApiPaths.BUILD_PAGE, { pageId: id });
}

export function getClientPage(transport: Transport, pageId: string) {
    return transport.get<IClientPageBody>(`${ApiPaths.BUILD_PAGE}/${pageId}`);
}

export function getPreviewFooter(transport: Transport, pageId: string) {
    return transport.get<IClientFooter>(`${ApiPaths.FOOTER_PAGE}`.replace(":id", pageId));
}

export function getPreviewHeader(transport: Transport, pageId: string) {
    return transport.get<IClientHeader>(`${ApiPaths.HEADER_PAGE}`.replace(":id", pageId));
}
