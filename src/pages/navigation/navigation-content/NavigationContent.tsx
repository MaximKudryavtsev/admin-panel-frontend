import React from "react";
import { TLang, TypeNavigation } from "../../../entities";
import { useNavigation } from "../../../hooks";
import { NavigationPanel } from "../../../widgets/navigation-panel";

interface INavigationContentProps {
    lang: TLang;
    type: TypeNavigation;
}

export const NavigationContent = (props: INavigationContentProps) => {
    const { lang, type } = props;
    const {
        navigations,
        navigation,
        navigationTypes,
        reorderNavigation,
        deleteNavigation,
        updateNavigation,
        createNavigation,
        getNavigation,
    } = useNavigation(lang, type);

    return (
        <NavigationPanel
            lang={lang}
            navigations={navigations}
            currentNavigation={navigation}
            navigationTypes={navigationTypes}
            deleteNavigation={deleteNavigation}
            createNavigation={createNavigation}
            getNavigation={getNavigation}
            updateNavigation={updateNavigation}
            reorderNavigation={reorderNavigation}
            type={type}
        />
    );
};
