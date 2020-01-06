import React, { useState } from "react";
import { INavigation, TCreateNavigationRequest, TLang } from "../../../entities";
import { useNavigation } from "../../../hooks";
import { NavigationItem } from "../../../components/navigation-item";
import { css } from "emotion";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { NavigationPopup, ICreateNavigation } from "../../../widgets/add-navigation";

interface INavigationContentProps {
    lang: TLang;
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
    const { lang } = props;
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
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

    function onCreateOpen(): void {
        setCreateOpen(true);
    }

    function onCreateClose(): void {
        setCreateOpen(false);
    }

    function onEditOpen(): void {
        setEditOpen(true);
    }

    function onEditClose(): void {
        setEditOpen(false);
    }

    const onCreateNavigation = (data: ICreateNavigation) => {
        const type =
            navigationTypes.find((item) => item._id === data.navigationTypeId) ||
            navigationTypes[0];
        const nav: TCreateNavigationRequest = {
            ...data,
            navigationType: type,
            parentId: data.parentId,
            isVisible: false,
            lang,
            position: navigations.length + 1,
        };
        createNavigation(nav).then(onCreateClose);
    };

    const onChangeVisibility = (navigation: INavigation) => {
        navigation.isVisible = !navigation.isVisible;
        updateNavigation({ ...navigation });
    };

    const onGetNavigation = (id: string) => {
        getNavigation(id).then(onEditOpen);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {navigations.map((item) => (
                    <NavigationItem
                        navigation={item}
                        key={item._id}
                        onChangeVisibility={onChangeVisibility}
                        onEdit={onGetNavigation}
                    />
                ))}
            </div>
            <Fab color="primary" aria-label="add" onClick={onCreateOpen}>
                <Add />
            </Fab>
            <NavigationPopup
                open={createOpen}
                navigationsTypes={navigationTypes}
                onClose={onCreateClose}
                onSubmit={onCreateNavigation}
            />
            <NavigationPopup
                navigation={navigation}
                open={editOpen}
                navigationsTypes={navigationTypes}
                onClose={onEditClose}
            />
        </div>
    );
};
