import React, { useEffect, useMemo, useState } from "react";
import { PagesList } from "../pages-list";
import { EPageType, TLang } from "../../entities";
import { usePageList } from "../../hooks/page";
import { LanguageTab } from "../../widgets/language-tab";
import { Transport } from "../../transport";

interface IPagesProps {
    defaultLang: TLang;
    title: string;
    type: EPageType;
    baseUrl: string;

    setPageTitle(title: string): void;
}

export const Pages = (props: IPagesProps) => {
    const { setPageTitle, defaultLang, title, type, baseUrl } = props;
    const [language, setLanguage] = useState<TLang>(defaultLang);

    useEffect(() => setPageTitle(title), [setPageTitle, title]);
    useEffect(() => setLanguage(defaultLang), [defaultLang]);

    const transport = useMemo(() => Transport.create(), []);

    const { pages } = usePageList(transport, language, type);

    return (
        <LanguageTab>
            <PagesList
                setLanguage={setLanguage}
                lang={"ru"}
                body={pages}
                type={type}
                baseUrl={baseUrl}
            />
            <PagesList
                setLanguage={setLanguage}
                lang={"en"}
                body={pages}
                type={type}
                baseUrl={baseUrl}
            />
        </LanguageTab>
    );
};
