import { Transport } from "../transport";
import { IBlock, ICreateBlockRequest, IDictionary } from "../entities";
import { ApiPaths } from "../config";

export function fetchBlockTypes(transport: Transport) {
    return transport.get<IDictionary[]>(ApiPaths.GET_BLOCK_TYPES);
}

export function createBlock(transport: Transport, data: ICreateBlockRequest) {
    return transport.post<ICreateBlockRequest, IBlock<any>[]>(ApiPaths.CREATE_BLOCK, data);
}
