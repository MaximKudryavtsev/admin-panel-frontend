import React, { useEffect, useState } from "react";
import { INavigation, TLang } from "../../../entities";
import { useNavigation } from "../../../hooks";
import { css } from "emotion";
import { NavigationPanel } from "../../../widgets/navigation-panel";

interface INavigationContentProps {
    lang: TLang;

    onSetNavigations?(navigations: INavigation[]): void;
}

const styles = {
    wrapper: css`
        width: fit-content;
    `,
    content: css`
        margin-bottom: 20px;
    `,
};

export const NavigationContent = (props: INavigationContentProps) => {
    const { lang, onSetNavigations } = props;
    const {
        navigations,
        navigation,
        navigationTypes,
        reorderNavigation,
        deleteNavigation,
        updateNavigation,
        createNavigation,
        getNavigation,
    } = useNavigation(lang);

    useEffect(() => {
        if (!onSetNavigations) {
            return;
        }
        onSetNavigations(navigations);
    }, [navigations, onSetNavigations]);

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
        />
    );
};
