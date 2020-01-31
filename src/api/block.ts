import { Transport } from "../transport";
import { IBlock, ICreateBlockRequest, IDictionary } from "../entities";
import { ApiPaths } from "../config";

export function fetchBlockTypes(transport: Transport) {
    return transport.get<IDictionary[]>(ApiPaths.GET_BLOCK_TYPES);
}

export function fetchBlocks(transport: Transport, pageId: string) {
    return transport.get<IBlock<any>[]>(`${ApiPaths.BLOCK}/${pageId}/list`);
}

export function createBlock(transport: Transport, data: ICreateBlockRequest) {
    return transport.post<ICreateBlockRequest, IBlock<any>[]>(ApiPaths.CREATE_BLOCK, data);
}

export function deleteBlock(transport: Transport, id: string) {
    return transport.delete(`${ApiPaths.BLOCK}/${id}`)
}

export function updateBlock(transport: Transport, id: string, data: FormData) {
    return transport.put<FormData, void>(`${ApiPaths.BLOCK}/${id}`, data);
}
