import { Transport } from "../../transport";
import { useCallback, useEffect, useState } from "react";
import { EPageType, IPagesTableRow, TLang } from "../../entities";
import { PageAPI } from "../../api";

export function usePageList(
    transport: Transport,
    lang: TLang,
    type: EPageType,
): {
    pages: IPagesTableRow[];
    getPages: () => void;
} {
    const [list, setList] = useState<IPagesTableRow[]>([]);

    const getList = useCallback(() => {
        return PageAPI.fetchPageList(transport, lang, type).then((response) =>
            setList(response.data),
        );
    }, [transport, lang, type]);

    useEffect(() => {
        getList();
    }, [getList]);

    return { pages: list, getPages: getList };
}
