import { Transport } from "../transport";
import { IDictionary } from "../entities";
import { ApiPaths } from "../config";

export function fetchBlockTypes(transport: Transport) {
    return transport.get<IDictionary[]>(ApiPaths.GET_BLOCK_TYPES);
}
