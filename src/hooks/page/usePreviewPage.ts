import { IClientFooter, IClientPageBody } from "../../entities";
import { Transport } from "../../transport";
import { useCallback, useEffect, useState } from "react";
import { PageAPI } from "../../api";

export function usePreviewPage(
    transport: Transport,
    pageId: string,
): {
    page: IClientPageBody | undefined;
    footer: IClientFooter | undefined;
    getPreviewFooter: () => Promise<void>;
} {
    const [page, setPage] = useState<IClientPageBody | undefined>(undefined);
    const [footer, setFooter] = useState<IClientFooter | undefined>(undefined);

    const getPage = useCallback(() => {
        PageAPI.getClientPage(transport, pageId).then((resposnse) => setPage(resposnse.data));
    }, [transport, pageId]);

    const getPreviewFooter = useCallback(() => {
        return PageAPI.getPreviewFooter(transport, pageId).then((response) => setFooter(response.data));
    }, [transport, pageId]);

    useEffect(() => {
        getPage();
    }, [getPage]);

    return { page, footer, getPreviewFooter };
}
