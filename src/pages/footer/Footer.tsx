import React, { useEffect, useState } from "react";
import { TLang } from "../../entities";
import { useNavigation } from "../../hooks";
import { LanguageTab } from "../../widgets/language-tab";
import { NavigationPanel } from "../../widgets/navigation-panel";

interface IFooterProps {
    setPageTitle(title: string): void;
}

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
        navigationsPages
    } = useNavigation(language, "footer");

    return (
        <LanguageTab>
            <div>
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
            <div>
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
        </LanguageTab>
    );
};
