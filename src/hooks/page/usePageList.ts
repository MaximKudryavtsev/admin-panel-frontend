import { Transport } from "../../transport";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IPagesTableRow, TLang } from "../../entities";
import { fetchPageList } from "../../api/page";

export function usePageList(lang: TLang): {
    pages: IPagesTableRow[];
    getPages: () => void;
} {
    const [list, setList] = useState<IPagesTableRow[]>([]);

    const transport = useMemo(() => new Transport(), []);
    const tokenString = localStorage.getItem("token");
    transport.setToken(JSON.parse(tokenString!));

    const getList = useCallback(() => {
        return fetchPageList(transport, lang).then((response) => setList(response.data));
    }, [transport, lang]);

    useEffect(() => {
        getList();
    }, [getList]);

    return {pages: list, getPages: getList}
}
