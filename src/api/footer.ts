import { Transport } from "../transport";
import { ApiPaths } from "../config";
import { IFooter, IIdResponse } from "../entities";

export function fetchFooter(transport: Transport, lang: string) {
    return transport.get<IFooter>(ApiPaths.FOOTER, { lang });
}

export function updateFooter(transport: Transport, data: Partial<IFooter>) {
    return transport.put<Partial<IFooter>, IIdResponse>(`${ApiPaths.FOOTER}/${data._id}`, data);
}
