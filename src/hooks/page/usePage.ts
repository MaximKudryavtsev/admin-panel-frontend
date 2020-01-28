import { Transport } from "../../transport";
import {
    IPage,
    IPageAuthor,
    IPageStatus,
    TResponse,
} from "../../entities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deletePage, fetchPage, fetchPageAuthor, fetchPageStatusList, updatePage } from "../../api/page";

export function usePage(pageId: string): {
    page?: IPage;
    getPage: () => Promise<void> | undefined;
    statuses: IPageStatus[];
    pageAuthor?: IPageAuthor;
    updatePage: (data: Partial<IPage>) => Promise<void>;
    deletePage: () => Promise<TResponse<void>>;
} {
    const [page, setPage] = useState<IPage | undefined>(undefined);
    const [pageAuthor, setPageAuthor] = useState<IPageAuthor | undefined>(undefined);
    const [statuses, setStatuses] = useState<IPageStatus[]>([]);

    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const getPage = useCallback(() => {
        return fetchPage(transport, pageId).then((response) => setPage(response.data));
    }, [pageId, transport]);

    const getStatuses = useCallback(() => {
        return fetchPageStatusList(transport).then((response) => setStatuses(response.data));
    }, [transport]);

    const getAuthor = useCallback(() => {
        fetchPageAuthor(transport, pageId).then((response) => setPageAuthor(response.data));
    }, [transport, pageId]);

    const update = useCallback((data: Partial<IPage>) => {
        return updatePage(transport, pageId, data).then((response) => setPage(response.data));
    }, [transport, pageId]);

    const del = useCallback(() => {
        return deletePage(transport, pageId);
    }, [transport, pageId]);

    useEffect(() => {
        if (pageId) {
            getStatuses();
            getPage();
            getAuthor();
        }
    }, [getPage, pageId, getStatuses, getAuthor]);

    return {page, getPage, statuses, pageAuthor, updatePage: update, deletePage: del}
}
