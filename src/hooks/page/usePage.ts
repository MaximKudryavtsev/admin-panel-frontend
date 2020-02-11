import { Transport } from "../../transport";
import {
    IDictionary, IIdResponse,
    IPage,
    IPageAuthor,
    TResponse,
} from "../../entities";
import { useCallback, useEffect, useState } from "react";
import { PageAPI } from "../../api";

export function usePage(transport: Transport, pageId: string): {
    page?: IPage;
    getPage: () => Promise<void>;
    statuses: IDictionary[];
    pageAuthor?: IPageAuthor;
    updatePage: (data: Partial<IPage>) => Promise<void>;
    deletePage: () => Promise<TResponse<void>>;
    buildPage: () => Promise<TResponse<IIdResponse>>;
} {
    const [page, setPage] = useState<IPage | undefined>(undefined);
    const [pageAuthor, setPageAuthor] = useState<IPageAuthor | undefined>(undefined);
    const [statuses, setStatuses] = useState<IDictionary[]>([]);

    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const getPage = useCallback(() => {
        return PageAPI.fetchPage(transport, pageId).then((response) => setPage(response.data));
    }, [pageId, transport]);

    const getStatuses = useCallback(() => {
        return PageAPI.fetchPageStatusList(transport).then((response) => setStatuses(response.data));
    }, [transport]);

    const getAuthor = useCallback(() => {
        PageAPI.fetchPageAuthor(transport, pageId).then((response) => setPageAuthor(response.data));
    }, [transport, pageId]);

    const update = useCallback((data: Partial<IPage>) => {
        return PageAPI.updatePage(transport, pageId, data).then((response) => setPage(response.data));
    }, [transport, pageId]);

    const del = useCallback(() => {
        return PageAPI.deletePage(transport, pageId);
    }, [transport, pageId]);

    const buildPage = useCallback(() => {
        return PageAPI.buildPage(transport, pageId);
    }, [transport, pageId]);

    useEffect(() => {
        if (pageId) {
            getStatuses();
            getPage().then(getAuthor);
        }
    }, [getPage, pageId, getStatuses, getAuthor]);

    return {page, getPage, statuses, pageAuthor, updatePage: update, deletePage: del, buildPage}
}
