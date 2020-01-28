import React, { useEffect, useState } from "react";
import { TLang } from "../../entities";
import { useNavigation } from "../../hooks";
import { LanguageTab } from "../../widgets/language-tab";
import { NavigationPanel } from "../../widgets/navigation-panel";

interface INavigationProps {
    setPageTitle(title: string): void;
}

export const Navigation = (props: INavigationProps) => {
    const { setPageTitle } = props;

    useEffect(() => setPageTitle("Навигация"), [setPageTitle]);
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
    } = useNavigation(language, "navigation");

    return (
        <LanguageTab>
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
                type={"navigation"}
                setLanguage={setLanguage}
                pages={navigationsPages}
            />
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
                type={"navigation"}
                setLanguage={setLanguage}
                pages={navigationsPages}
            />
        </LanguageTab>
    );
};
