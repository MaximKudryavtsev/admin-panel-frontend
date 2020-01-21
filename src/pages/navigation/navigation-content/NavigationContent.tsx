import React, { useEffect } from "react";
import { INavigation, TLang, TypeNavigation } from "../../../entities";
import { useNavigation } from "../../../hooks";
import { css } from "emotion";
import { NavigationPanel } from "../../../widgets/navigation-panel";

interface INavigationContentProps {
    lang: TLang;
    type: TypeNavigation;

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
    const { lang, onSetNavigations, type } = props;
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
            reorderNavigation={reorderNavigation}
            type={type}
        />
    );
};
