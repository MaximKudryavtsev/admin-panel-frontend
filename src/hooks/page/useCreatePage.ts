import { Transport } from "../../transport";
import { ICreatePageRequest, ICreatePageResponse, TLang, TResponse } from "../../entities";
import { useCallback, useMemo } from "react";
import { createPage } from "../../api/page";

export function useCreatePage(
    lang: TLang = "ru",
): {
    createPage: (data: ICreatePageRequest) => Promise<TResponse<ICreatePageResponse>>;
} {
    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const create = useCallback(
        (data: ICreatePageRequest) => {
            return createPage(transport, data, lang);
        },
        [transport, lang],
    );

    return { createPage: create };
}
