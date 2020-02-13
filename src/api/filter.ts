import { Transport } from "../transport";
import { ApiPaths } from "../config";
import { IDictionary, IFilter, IIdResponse } from "../entities";

export function fetchAllFilters(transport: Transport) {
    return transport.get<IDictionary[]>(ApiPaths.FILTER_LIST)
}

export function fetchFilter(transport: Transport, id: string) {
    return transport.get<IFilter>(`${ApiPaths.FILTER}/${id}`);
}

export function creatFilter(transport: Transport, data: IFilter) {
    return transport.post<IFilter, IIdResponse>(ApiPaths.FILTER, data);
}

export function updateFilter(transport: Transport, id: string, data: IFilter) {
    return transport.put<IFilter, IIdResponse>(`${ApiPaths.FILTER}/${id}`, data);
}

export function deleteFilter(transport: Transport, id: string) {
    return transport.delete(`${ApiPaths.FILTER}/${id}`);
}
