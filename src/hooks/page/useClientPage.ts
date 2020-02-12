import { IClientPageBody } from "../../entities";
import { Transport } from "../../transport";
import { useCallback, useEffect, useState } from "react";
import { PageAPI } from "../../api";

export function useClientPage(
    transport: Transport,
    pageId: string,
): {
    page: IClientPageBody | undefined;
} {
    const [page, setPage] = useState<IClientPageBody | undefined>(undefined);

    const getPage = useCallback(() => {
        PageAPI.getClientPage(transport, pageId).then((resposnse) => setPage(resposnse.data));
    }, [transport, pageId]);

    useEffect(() => {
        getPage();
    }, [getPage]);

    return { page };
}
