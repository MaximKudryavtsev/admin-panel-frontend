import React, { useEffect } from "react";
import { css } from "emotion";
import { Grid } from "@material-ui/core";
import { useUser } from "../../hooks";

interface IProfileProps {
    setPageTitle(title: string): void;
}

const classes = {
    wrapper: css`
        width: 100%;
        display: flex;
    `,
    left: css`
        padding-right: 24px;
    `
};

export const Profile = (props: IProfileProps) => {
    const { setPageTitle } = props;
    const { user, updateUser, deleteUser, updateAvatar, updatePassword } = useUser();

    useEffect(() => {
        setPageTitle(`Профиль пользователя ${user?.login || user?.email}`)
    }, [setPageTitle, user]);

    return (
        <Grid container  xs={12}>
            <Grid item xs={3} className={classes.left}>
                avatar
            </Grid>
            <Grid item xs={9}>
                form
            </Grid>
        </Grid>
    );
};
