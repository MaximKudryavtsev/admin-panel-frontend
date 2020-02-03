import { TLang, TNavigationPage } from "../entities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { fetchNavigationPages } from "../api";

export function useFetchPages(lang: TLang): { pages: TNavigationPage[] } {
    const transport = useMemo(() => Transport.create(), []);
    const [pages, setPages] = useState<TNavigationPage[]>([]);

    const fetchPages = useCallback(() => {
        return fetchNavigationPages(transport, lang).then((response) => setPages(response.data));
    }, [lang, transport]);

    useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    return { pages };
}
