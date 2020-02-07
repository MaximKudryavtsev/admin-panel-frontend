import React, { useEffect, useState } from "react";
import { TLang } from "../../entities";
import { useContacts, useFooter, useNavigation } from "../../hooks";
import { LanguageTab } from "../../widgets/language-tab";
import { NavigationPanel } from "../../widgets/navigation-panel";
import { FooterPanel } from "../../widgets/footer-panel";
import { css } from "emotion";

interface IFooterProps {
    defaultLang: TLang;

    setPageTitle(title: string): void;
}

const classNames = {
    navigation: css`
        margin: 0 24px 24px 0;
    `
};

export const Footer = (props: IFooterProps) => {
    const { setPageTitle, defaultLang } = props;

    useEffect(() => setPageTitle("Футер"), [setPageTitle]);

    const [language, setLanguage] = useState<TLang>(defaultLang);

    useEffect(() => setLanguage(defaultLang), [defaultLang]);

    const {
        navigations,
        navigation,
        navigationTypes,
        reorderNavigation,
        deleteNavigation,
        updateNavigation,
        createNavigation,
        getNavigation,
        navigationsPages,
    } = useNavigation(language, "footer");
    const { footer, updateFooter, setFooter } = useFooter(language);
    const { contacts } = useContacts(language);

    const onSwitchLanguage = () => {
      setFooter(undefined);
    };

    return (
        <LanguageTab onSwitch={onSwitchLanguage}>
            <div className={css`display: flex; flex-wrap: wrap;`}>
                <div className={classNames.navigation}>
                    <NavigationPanel
                        lang={"ru"}
                        navigations={navigations}
                        currentNavigation={navigation}
                        navigationTypes={navigationTypes}
                        deleteNavigation={deleteNavigation}
                        createNavigation={createNavigation}
                        getNavigation={getNavigation}
                        updateNavigation={updateNavigation}
                        reorderNavigation={reorderNavigation}
                        type={"footer"}
                        setLanguage={setLanguage}
                        pages={navigationsPages}
                    />
                </div>
                <FooterPanel
                    lang={"ru"}
                    setLanguage={setLanguage}
                    footer={footer}
                    updateFooter={updateFooter}
                    navigationTypes={navigationTypes}
                    pages={navigationsPages}
                    contacts={contacts}
                />
            </div>
            <div className={css`display: flex; flex-wrap: wrap;`}>
                <div className={classNames.navigation}>
                    <NavigationPanel
                        lang={"en"}
                        navigations={navigations}
                        currentNavigation={navigation}
                        navigationTypes={navigationTypes}
                        deleteNavigation={deleteNavigation}
                        createNavigation={createNavigation}
                        getNavigation={getNavigation}
                        updateNavigation={updateNavigation}
                        reorderNavigation={reorderNavigation}
                        type={"footer"}
                        setLanguage={setLanguage}
                        pages={navigationsPages}
                    />
                </div>
                <FooterPanel
                    lang={"en"}
                    setLanguage={setLanguage}
                    footer={footer}
                    updateFooter={updateFooter}
                    navigationTypes={navigationTypes}
                    pages={navigationsPages}
                    contacts={contacts}
                />
            </div>
        </LanguageTab>
    );
};
