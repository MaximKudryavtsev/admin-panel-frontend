import React, { useEffect, useState } from "react";
import { IHeader, TLang } from "../../entities";
import { LanguageTab } from "../../widgets/language-tab";
import { HeaderPanel } from "../../widgets/header-panel";
import { useFetchPages, useHeader } from "../../hooks";
import { useSnackbar } from "notistack";
import { omit } from "lodash";

interface IHeaderProps {
    defaultLang: TLang;

    setPageTitle(title: string): void;
}

export const Header = (props: IHeaderProps) => {
    const { setPageTitle, defaultLang } = props;
    const [language, setLanguage] = useState<TLang>(defaultLang);

    const { header, deleteLogo, uploadLogo, updateHeader } = useHeader(language);
    const { pages } = useFetchPages(language);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => setPageTitle("Хедер"), [setPageTitle]);
    useEffect(() => setLanguage(defaultLang), [defaultLang]);

    const handleSubmit = (data: Partial<IHeader>) => {
        return updateHeader(omit(data, ["logoLink"])).then(() => {
            enqueueSnackbar("Успешно сохранено!", { variant: "success" });
        });
    };

    return (
        <LanguageTab>
            <HeaderPanel
                setLanguage={setLanguage}
                lang={"ru"}
                header={header}
                onDeleteLogo={deleteLogo}
                onUploadLogo={uploadLogo}
                pages={pages}
                onSubmit={handleSubmit}
            />
            <HeaderPanel
                setLanguage={setLanguage}
                lang={"en"}
                header={header}
                onDeleteLogo={deleteLogo}
                onUploadLogo={uploadLogo}
                pages={pages}
                onSubmit={handleSubmit}
            />
        </LanguageTab>
    );
};
