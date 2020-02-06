import React, { useEffect, useMemo, useState } from "react";
import { PagesList } from "../pages-list";
import { TLang } from "../../entities";
import { usePageList } from "../../hooks/page";
import { LanguageTab } from "../../widgets/language-tab";
import { Transport } from "../../transport";

interface IPagesProps {
    setPageTitle(title: string): void;
}

export const Pages = (props: IPagesProps) => {
    const { setPageTitle } = props;

    useEffect(() => setPageTitle("Страницы"), [setPageTitle]);

    const [language, setLanguage] = useState<TLang>("ru");
    const transport = useMemo(() => Transport.create(), []);

    const { pages } = usePageList(transport, language);

    return (
        <LanguageTab>
            <PagesList setLanguage={setLanguage} lang={"ru"} body={pages} />
            <PagesList setLanguage={setLanguage} lang={"en"} body={pages} />
        </LanguageTab>
    );
};
