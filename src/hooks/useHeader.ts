import { useCallback, useEffect, useMemo, useState } from "react";
import { Transport } from "../transport";
import { IHeader, IHeaderLogo, TLang } from "../entities";
import { HeaderAPI } from "../api";

export function useHeader(
    lang: TLang,
): {
    header?: IHeader;
    updateHeader: (data: Partial<IHeader>) => Promise<void>;
    uploadLogo: (data: IHeaderLogo) => Promise<void>;
    deleteLogo: () => Promise<void>;
} {
    const transport = useMemo(() => Transport.create(), []);
    const [header, setHeader] = useState<IHeader | undefined>(undefined);

    const fetch = useCallback(() => {
        HeaderAPI.fetchHeader(transport, lang).then((response) => setHeader(response.data));
    }, [transport, lang]);

    const update = useCallback(
        (data: Partial<IHeader>) => {
            return HeaderAPI.updateHeader(transport, data, lang).then(fetch);
        },
        [transport, lang, fetch],
    );

    const uploadLogo = useCallback(
        (data: IHeaderLogo) => {
            return HeaderAPI.uploadLogo(transport, data, lang).then(fetch);
        },
        [transport, lang, fetch],
    );

    const deleteLogo = useCallback(() => {
        return HeaderAPI.deleteLogo(transport, lang).then(fetch);
    }, [transport, lang, fetch]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { header, updateHeader: update, uploadLogo, deleteLogo };
}
