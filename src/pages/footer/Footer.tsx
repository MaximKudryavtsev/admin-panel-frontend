import React, { useEffect, useState } from "react";
import { TLang } from "../../entities";
import { useFooter, useNavigation, useNavigationTypes } from "../../hooks";
import { LanguageTab } from "../../widgets/language-tab";
import { NavigationPanel } from "../../widgets/navigation-panel";
import { FooterPanel } from "../../widgets/footer-panel";
import { css } from "emotion";

interface IFooterProps {
    setPageTitle(title: string): void;
}

const classNames = {
    navigation: css`
        margin-bottom: 24px;
    `
};

export const Footer = (props: IFooterProps) => {
    const { setPageTitle } = props;

    useEffect(() => setPageTitle("Футер"), [setPageTitle]);

    const [language, setLanguage] = useState<TLang>("ru");

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

    const onSwitchLanguage = () => {
      setFooter(undefined);
    };

    return (
        <LanguageTab onSwitch={onSwitchLanguage}>
            <div>
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
                />
            </div>
            <div>
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
                />
            </div>
        </LanguageTab>
    );
};
