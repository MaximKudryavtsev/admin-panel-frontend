import React, { useEffect, useState } from "react";
import {
    INavigation,
    INavigationType,
    TCreateNavigationRequest,
    TLang,
    TUpdateNavigationRequest,
} from "../../entities";
import { css } from "emotion";
import { NavigationItem } from "../../components/navigation-item";
import { Fab, IconButton } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";
import { ICreateNavigation, NavigationPopup } from "../add-navigation";
import { ConfirmPopup } from "../../components/confirm-popup";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { reorder } from "../../utils";

interface INavigationPanelProps {
    navigations: INavigation[];
    navigationTypes: INavigationType[];
    currentNavigation?: INavigation;
    parentId?: string;
    lang: TLang;
    isChildren?: boolean;

    createNavigation?(navigation: TCreateNavigationRequest): Promise<void>;

    updateNavigation?(navigation: TUpdateNavigationRequest): Promise<void>;

    deleteNavigation?(id: string): Promise<void>;

    getNavigation?(id: string): Promise<void>;
}

const styles = {
    container: css`
        display: flex;
    `,
    wrapper: css`
        width: fit-content;
    `,
    content: css`
        margin-bottom: 20px;
    `,
    children: css`
        margin-left: 20px;
        display: flex;
    `,
    closeChildren: css`
        margin-left: 10px;
        height: fit-content;
    `,
};

export const NavigationPanel = (props: INavigationPanelProps) => {
    const {
        currentNavigation,
        navigationTypes = [],
        createNavigation,
        deleteNavigation,
        getNavigation,
        updateNavigation,
        lang,
        isChildren,
    } = props;
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [currentNavigationId, setCurrentNavigationId] = useState<string | undefined>(undefined);
    const [parentId, setParentId] = useState<string | undefined>(undefined);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [childrenVisible, setChildrenVisible] = useState(false);
    const [children, setChildren] = useState<INavigation[]>([]);
    const [navigations, setNavigations] = useState<INavigation[]>(props.navigations ?? []);

    useEffect(() => {
        setNavigations(props.navigations);
    }, [props.navigations]);

    useEffect(() => {
        setChildren(props.navigations.filter((item) => item.parentId === parentId));
        // если список потомков открыт и мы выключаем второй уровень у родителя, то список потомков скрывается
        const nav = props.navigations.find((item) => item._id === parentId);
        if (nav) {
            if (!nav.hasChild) {
                onCloseChildren();
            }
        }
    }, [props.navigations, parentId]);

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

    function onDeleteOpen(): void {
        setDeleteOpen(true);
    }

    function onDeleteClose(): void {
        setDeleteOpen(false);
    }

    const onCreateNavigation = (data: ICreateNavigation) => {
        if (!createNavigation) {
            return;
        }
        const type =
            navigationTypes.find((item) => item._id === data.navigationTypeId) ||
            navigationTypes[0];
        const nav: TCreateNavigationRequest = {
            ...data,
            navigationType: type,
            parentId: props.parentId,
            isVisible: false,
            lang,
            position:
                navigations.filter((item) =>
                    item.parentId ? item.parentId === props.parentId : !item.parentId,
                ).length + 1,
        };
        createNavigation(nav).then(onCreateClose);
    };

    const onChangeVisibility = (navigation: INavigation) => {
        if (!updateNavigation) {
            return;
        }
        navigation.isVisible = !navigation.isVisible;
        updateNavigation({ ...navigation });
    };

    const onGetNavigation = (id: string) => {
        if (!getNavigation) {
            return;
        }
        getNavigation(id).then(onEditOpen);
    };

    const onDeleteNavigation = (id: string) => {
        setCurrentNavigationId(id);
        onDeleteOpen();
    };

    const onUpdateNavigation = (data: ICreateNavigation) => {
        if (!currentNavigation || !updateNavigation) {
            return;
        }
        const type = navigationTypes.find((item) => item._id === data.navigationTypeId);
        currentNavigation.navigationType = type || navigationTypes[0];
        updateNavigation({ ...currentNavigation, ...data, navigationType: type }).then(onEditClose);
    };

    const confirmDelete = () => {
        if (!deleteNavigation || !currentNavigationId) {
            return;
        }
        deleteNavigation(currentNavigationId).then(() => {
            onDeleteClose();
            if (currentNavigationId === parentId) {
                setChildrenVisible(false);
                setParentId(undefined);
                setChildren([]);
            }
        });
    };

    const onOpenChildren = (id: string) => {
        setParentId(id);
        const childrenNavigation = navigations.filter((item) => item.parentId === id);
        setChildren(childrenNavigation);
        setChildrenVisible(true);
    };

    const onCloseChildren = () => {
        setChildrenVisible(false);
        setParentId(undefined);
        setChildren([]);
    };

    const data = navigations.filter((item) =>
        item.parentId ? item.parentId === props.parentId : !item.parentId,
    );

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(data, result.source.index, result.destination.index);
        setNavigations(items);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={"navigation"} direction={"vertical"}>
                        {(provided) => (
                            <div
                                className={styles.content}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {data.map((item, index) => (
                                    <Draggable index={index} draggableId={item._id} key={item._id}>
                                        {(provided) => (
                                            <NavigationItem
                                                innerRef={provided.innerRef}
                                                draggableProps={provided.draggableProps}
                                                dragHandleProps={provided.dragHandleProps}
                                                navigation={item}
                                                key={item._id}
                                                onChangeVisibility={onChangeVisibility}
                                                onEdit={onGetNavigation}
                                                onDelete={onDeleteNavigation}
                                                onOpenChildren={onOpenChildren}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <Fab color="primary" aria-label="add" onClick={onCreateOpen}>
                    <Add />
                </Fab>
                <NavigationPopup
                    open={createOpen}
                    navigationsTypes={navigationTypes}
                    onClose={onCreateClose}
                    onSubmit={onCreateNavigation}
                    isChildren={isChildren}
                />
                <NavigationPopup
                    navigation={currentNavigation}
                    open={editOpen}
                    navigationsTypes={navigationTypes}
                    onClose={onEditClose}
                    onSubmit={onUpdateNavigation}
                    title={"Редактировать навигацию"}
                    isChildren={isChildren}
                />
                <ConfirmPopup
                    open={deleteOpen}
                    onClose={onDeleteClose}
                    title={`Удалить навигацию "${
                        navigations.find((item) => item._id === currentNavigationId)?.title
                    }"?`}
                    submitTitle={"Удалить"}
                    onSubmit={confirmDelete}
                />
            </div>
            {childrenVisible && (
                <div className={styles.children}>
                    <NavigationPanel
                        navigations={children}
                        currentNavigation={currentNavigation}
                        navigationTypes={navigationTypes}
                        lang={lang}
                        parentId={parentId}
                        deleteNavigation={deleteNavigation}
                        createNavigation={createNavigation}
                        getNavigation={getNavigation}
                        updateNavigation={updateNavigation}
                        isChildren
                    />
                    <IconButton className={styles.closeChildren} onClick={onCloseChildren}>
                        <Close />
                    </IconButton>
                </div>
            )}
        </div>
    );
};
