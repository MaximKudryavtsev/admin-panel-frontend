import { Transport } from "../../transport";
import { EPageType, ICreatePageRequest, ICreatePageResponse, TLang, TResponse } from "../../entities";
import { useCallback } from "react";
import { PageAPI } from "../../api";

export function useCreatePage(
    transport: Transport,
    lang: TLang = "ru",
    type: EPageType
): {
    createPage: (data: ICreatePageRequest) => Promise<TResponse<ICreatePageResponse>>;
} {
    const create = useCallback(
        (data: ICreatePageRequest) => {
            return PageAPI.createPage(transport, data, lang, type);
        },
        [transport, lang, type],
    );

    return { createPage: create };
}
