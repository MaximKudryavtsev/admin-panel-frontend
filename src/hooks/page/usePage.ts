import { Transport } from "../../transport";
import { ICreatePageRequest, ICreatePageResponse, IPage, TLang, TResponse } from "../../entities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPage, fetchPage } from "../../api/page";

export function usePage(lang: TLang, pageId?: string): {
    page?: IPage;
    getPage: () => Promise<void> | undefined;
    createPage: (data: ICreatePageRequest) => Promise<TResponse<ICreatePageResponse>>
} {
    const [page, setPage] = useState<IPage | undefined>(undefined);

    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const getPage = useCallback(() => {
        if (!pageId) {
            return;
        }
        return fetchPage(transport, pageId).then((response) => setPage(response.data));
    }, [pageId, transport]);

    const create = useCallback((data: ICreatePageRequest) => {
        return  createPage(transport, data, lang);
    }, [transport, lang]);

    useEffect(() => {
        getPage();
    }, [getPage]);

    return {page, getPage, createPage: create}
}
