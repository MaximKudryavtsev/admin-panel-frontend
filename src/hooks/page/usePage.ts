import { Transport } from "../../transport";
import { ICreatePageRequest, ICreatePageResponse, IPage, IPageStatus, TLang, TResponse } from "../../entities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPage, fetchPage, fetchPageStatusList } from "../../api/page";

export function usePage(lang: TLang, pageId?: string): {
    page?: IPage;
    getPage: () => Promise<void> | undefined;
    createPage: (data: ICreatePageRequest) => Promise<TResponse<ICreatePageResponse>>;
    statuses: IPageStatus[];
} {
    const [page, setPage] = useState<IPage | undefined>(undefined);
    const [statuses, setStatuses] = useState<IPageStatus[]>([]);

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

    const getStatuses = useCallback(() => {
        fetchPageStatusList(transport).then((response) => setStatuses(response.data));
    }, [transport]);

    useEffect(() => {
        if (pageId) {
            getPage();
            getStatuses();
        }
    }, [getPage, pageId, getStatuses]);

    return {page, getPage, createPage: create, statuses}
}
