import React from "react";
import { INavigation } from "../../entities";
import { IconButton, Paper, Typography } from "@material-ui/core";
import { css } from "emotion";
import {
    ArrowForwardIos,
    Delete,
    DragIndicator,
    Edit,
    Visibility,
    VisibilityOff,
} from "@material-ui/icons";

interface INavigationItemProps {
    navigation: Partial<INavigation>;
}

const styles = {
    item: css`
        display: flex;
        align-items: center;
        width: 500px;
        padding: 5px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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
    const { navigation } = props;

    return (
        <Paper className={styles.item}>
            <IconButton className={styles.icon}>
                <DragIndicator />
            </IconButton>
            <Typography className={styles.title}>{navigation.title}</Typography>
            <div className={styles.icons}>
                <IconButton className={styles.icon}>
                    {navigation.isVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                <IconButton className={styles.icon}>
                    <Edit />
                </IconButton>
                <IconButton className={styles.icon}>
                    <Delete />
                </IconButton>
                {navigation.hasChild && (
                    <IconButton className={styles.icon}>
                        <ArrowForwardIos />
                    </IconButton>
                )}
            </div>
        </Paper>
    );
};
