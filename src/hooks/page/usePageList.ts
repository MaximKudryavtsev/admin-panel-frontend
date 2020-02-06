import { Transport } from "../../transport";
import { useCallback, useEffect, useState } from "react";
import { IPagesTableRow, TLang } from "../../entities";
import { PageAPI } from "../../api";

export function usePageList(transport: Transport, lang: TLang): {
    pages: IPagesTableRow[];
    getPages: () => void;
} {
    const [list, setList] = useState<IPagesTableRow[]>([]);

    const getList = useCallback(() => {
        return PageAPI.fetchPageList(transport, lang).then((response) => setList(response.data));
    }, [transport, lang]);

    useEffect(() => {
        getList();
    }, [getList]);

    return {pages: list, getPages: getList}
}
