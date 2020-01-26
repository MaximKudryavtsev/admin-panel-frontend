import { Transport } from "../transport";
import {
    ICreatePageRequest,
    ICreatePageResponse,
    IPage,
    IPageAuthor,
    IPagesTableRow,
    IPageStatus,
    TLang,
} from "../entities";
import { ApiPaths } from "../config";

export function fetchPageStatusList(transport: Transport) {
    return transport.get<IPageStatus[]>(ApiPaths.GET_PAGE_STATUSES);
}

export function fetchPageList(transport: Transport, lang: TLang) {
    return transport.get<IPagesTableRow[]>(ApiPaths.GET_PAGE_LIST, {lang});
}

export function createPage(transport: Transport, data: ICreatePageRequest, lang: TLang) {
    return transport.post<ICreatePageRequest, ICreatePageResponse>(ApiPaths.CREATE_PAGE, data, {lang});
}

export function fetchPage(transport: Transport, id: string) {
    return transport.get<IPage>(ApiPaths.GET_PAGE.replace(":id", id));
}

export function fetchPageAuthor(transport: Transport, id: string) {
    return transport.get<IPageAuthor>(ApiPaths.GET_PAGE_AUTHOR.replace(":id", id));
}

export function updatePage(transport: Transport, id: string, data: Partial<IPage>) {
    return transport.put<Partial<IPage>, IPage>(ApiPaths.GET_PAGE.replace(":id", id), data);
}
