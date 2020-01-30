import { Transport } from "../transport";
import { TLang } from "../entities";
import { ApiPaths } from "../config";

export function updateBlog(transport: Transport, lang: TLang) {
    return transport.post<undefined, void>(ApiPaths.UPDATE_BLOG, undefined, { lang });
}
