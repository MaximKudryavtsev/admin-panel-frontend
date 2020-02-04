import React from "react";
import { INavigation } from "../../entities";
import { IconButton, Paper, Typography } from "@material-ui/core";
import { css } from "emotion";
import {
    ArrowForwardIos,
    Delete,
    DragIndicator,
    Edit,
} from "@material-ui/icons";
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { ToggleIconButton } from "../toggle-icon-button";

interface INavigationItemProps {
    navigation: INavigation;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null;

    innerRef(element?: HTMLElement | null): any;

    onChangeVisibility?(navigation: INavigation): void;

    onEdit?(id: string): void;

    onDelete?(id: string): void;

    onOpenChildren?(id: string): void;
}

const styles = {
    item: css`
        display: flex;
        align-items: center;
        width: 500px;
        padding: 5px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 0 !important;
        :first-child {
            border-radius: 4px 4px 0 0 !important;
        }
        :last-child {
            border-radius: 0 0 4px 4px !important;
            border-bottom: none;
        }
    `,
    title: css`
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    `,
    icons: css`
        margin-left: auto;
        display: flex;
        align-items: center;
    `,
    icon: css`
        margin-right: 5px !important;
        :last-child {
            margin-right: 0 !important;
        }
    `,
};

export const NavigationItem = (props: INavigationItemProps) => {
    const {
        navigation,
        onChangeVisibility,
        onDelete,
        onEdit,
        onOpenChildren,
        dragHandleProps,
        draggableProps,
        innerRef
    } = props;

    const handleChangeVisibility = () => {
        if (!onChangeVisibility) {
            return;
        }
        onChangeVisibility(navigation);
    };

    const handleGetNavigation = () => {
        if (!onEdit) {
            return;
        }
        onEdit(navigation._id);
    };

    const handleDelete = () => {
        if (!onDelete) {
            return;
        }
        onDelete(navigation._id);
    };

    const handleOpenChildren = () => {
        if (!onOpenChildren) {
            return;
        }
        onOpenChildren(navigation._id);
    };

    return (
        <>
            <Paper className={styles.item} ref={innerRef} {...draggableProps}>
                <div {...dragHandleProps}>
                    <IconButton className={styles.icon}>
                        <DragIndicator />
                    </IconButton>
                </div>
                <Typography className={styles.title}>{navigation.title}</Typography>
                <div className={styles.icons}>
                    <ToggleIconButton on={navigation.isVisible} onClick={handleChangeVisibility} />
                    <IconButton className={styles.icon} onClick={handleGetNavigation}>
                        <Edit />
                    </IconButton>
                    <IconButton className={styles.icon} onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                    {navigation.hasChild && (
                        <IconButton className={styles.icon} onClick={handleOpenChildren}>
                            <ArrowForwardIos />
                        </IconButton>
                    )}
                </div>
            </Paper>
        </>
    );
};
