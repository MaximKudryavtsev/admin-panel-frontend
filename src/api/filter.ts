import { Transport } from "../transport";
import { ApiPaths } from "../config";
import { IDictionary, IFilter, IIdResponse, TCreateFilterRequest, TLang } from "../entities";

export function fetchFilterListShort(transport: Transport, lang: TLang) {
    return transport.get<IDictionary[]>(`${ApiPaths.FILTER}/short`, { lang });
}

export function fetchAllFilters(transport: Transport, lang: TLang) {
    return transport.get<IFilter[]>(ApiPaths.FILTER, { lang });
}

export function fetchFilter(transport: Transport, id: string) {
    return transport.get<IFilter>(`${ApiPaths.FILTER}/${id}`);
}

export function creatFilter(transport: Transport, data: TCreateFilterRequest) {
    return transport.post<TCreateFilterRequest, IIdResponse>(ApiPaths.FILTER, data);
}

export function updateFilter(transport: Transport, id: string, data: Partial<IFilter>) {
    return transport.put<Partial<IFilter>, IIdResponse>(`${ApiPaths.FILTER}/${id}`, data);
}

export function deleteFilterPack(transport: Transport, id: string) {
    return transport.delete(`${ApiPaths.FILTER}/${id}`);
}

export function deleteFilter(transport: Transport, filterPackId: string, filterId: string) {
    return transport.delete(`${ApiPaths.FILTER}/${filterPackId}/${filterId}`);
}
