import { IFooter, TLang } from "../entities";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { FooterAPI } from "../api";

interface IUseFooter {
    footer?: IFooter;

    updateFooter: (data: Partial<IFooter>) => Promise<void>;

    setFooter: Dispatch<SetStateAction<IFooter | undefined>>
}

export function useFooter(lang: TLang): IUseFooter {
    const transport = useMemo(() => Transport.create(), []);
    const [footer, setFooter] = useState<IFooter | undefined>(undefined);

    const fetch = useCallback(() => {
        FooterAPI.fetchFooter(transport, lang).then((response) => setFooter(response.data));
    }, [transport, lang]);

    const update = useCallback((data: Partial<IFooter>) => {
        return FooterAPI.updateFooter(transport, data).then(fetch);
    }, [transport, lang]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { footer, updateFooter: update, setFooter };
}
