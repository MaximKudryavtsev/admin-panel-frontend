import { EPageType, TLang, TNavigationPage } from "../entities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { fetchNavigationPages } from "../api";

export function useFetchPages(lang: TLang, type: EPageType): { pages: TNavigationPage[] } {
    const transport = useMemo(() => Transport.create(), []);
    const [pages, setPages] = useState<TNavigationPage[]>([]);

    const fetchPages = useCallback(() => {
        return fetchNavigationPages(transport, lang, type).then((response) => setPages(response.data));
    }, [lang, transport, type]);

    useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    return { pages };
}
