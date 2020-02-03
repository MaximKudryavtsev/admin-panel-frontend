import { Transport } from "../transport";
import { IHeader, IHeaderLogo, TLang } from "../entities";
import { ApiPaths } from "../config";

export function fetchHeader(transport: Transport, lang: TLang) {
    return transport.get<IHeader>(ApiPaths.HEADER, { lang });
}

export function updateHeader(transport: Transport, data: Partial<IHeader>, lang: TLang) {
    return transport.put<Partial<IHeader>, void>(ApiPaths.HEADER, data, { lang });
}

export function uploadLogo(transport: Transport, data: IHeaderLogo, lang: TLang) {
    return transport.put<FormData, void>(ApiPaths.HEADER_LOGO, transport.formatToFormData(data), {
        lang,
    });
}

export function deleteLogo(transport: Transport, lang: TLang) {
    return transport.delete(ApiPaths.HEADER_LOGO, { lang });
}
