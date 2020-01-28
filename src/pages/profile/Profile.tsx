import React, { useEffect, useState } from "react";
import { css } from "emotion";
import { Chip, Divider, Grid, Typography } from "@material-ui/core";
import { useSnackbar, useUser } from "../../hooks";
import { Card } from "../../components/card";
import { Snackbar } from "../../components/snackbar";
import { IChangePasswordData, IUser } from "../../entities";
import { UpdateUserForm, ChangePassword, UploadAvatar } from "../../widgets";
import { getServerError } from "../../utils";

interface IProfileProps {
    setPageTitle(title: string): void;

    onSetUser?(user?: IUser): void;
}

const classes = {
    wrapper: css`
        width: 100%;
        display: flex;
    `,
    left: css`
        padding-right: 24px;
    `,
};

export const Profile = (props: IProfileProps) => {
    const { setPageTitle, onSetUser } = props;
    const { user, updateUser, deleteUser, updateAvatar, updatePassword, deleteAvatar } = useUser();
    const { error, snackbar, setSnackbarError, setSnackbarState, onSnackbarClose } = useSnackbar();
    const [avatarLoaderVisible, setAvatarLoaderVisible] = useState(false);
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

    useEffect(() => {
        setPageTitle(`Профиль пользователя ${user?.login || user?.email}`);
    }, [setPageTitle, user]);

    useEffect(() => {
        if (!onSetUser) {
            return;
        }
        onSetUser(user);
    }, [user, onSetUser]);

    const onUploadAvatar = (file: File) => {
        setAvatarLoaderVisible(true);
        updateAvatar({ avatar: file }).then(() => {
            setAvatarLoaderVisible(false);
        });
    };

    const onDeleteAvatar = () => {
        setAvatarLoaderVisible(true);
        deleteAvatar().then(() => {
            setAvatarLoaderVisible(false);
        });
    };

    const onUpdateUser = (user: Partial<IUser>) => {
        updateUser(user)
            .then(() => setSnackbarState({ open: true, message: "Логин изменен!" }))
            .catch(() => {
                setSnackbarError(true);
                setSnackbarState({ open: true, message: "Ошибка сервера" });
            });
    };

    const onUpdatePassword = (data: IChangePasswordData) => {
        setPasswordError(undefined);
        updatePassword(data)
            .then(() => setSnackbarState({ open: true, message: "Пароль изменен!" }))
            .catch((error) => {
                const serverError = getServerError(error);
                if (!serverError) {
                    return;
                }
                setPasswordError(serverError.title);
            });
    };

    return (
        <>
            <Grid container>
                <Grid item xs={2} className={classes.left}>
                    <UploadAvatar
                        src={user?.avatar}
                        loading={avatarLoaderVisible}
                        uploadAvatar={onUploadAvatar}
                        onDeleteAvatar={onDeleteAvatar}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid
                            item
                            xs={6}
                            className={css`
                                padding-right: 24px;
                            `}
                        >
                            <Card title={"Личная информация"}>
                                <UpdateUserForm user={user} onSubmit={onUpdateUser} />
                                <Divider
                                    className={css`
                                        margin: 20px 0 !important;
                                    `}
                                />
                                <Typography
                                    className={css`
                                        margin-bottom: 20px !important;
                                    `}
                                >
                                    Сменить пароль
                                </Typography>
                                <ChangePassword error={passwordError} onSubmit={onUpdatePassword} />
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card title={"Роли"}>
                                {user?.roles?.map((role) => (
                                    <Chip
                                        key={role._id}
                                        label={role.title}
                                        variant={"outlined"}
                                        color={"primary"}
                                        className={css`
                                            margin: 0 20px 20px 0;
                                        `}
                                    />
                                ))}
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                error={error}
                onClose={onSnackbarClose}
            />
        </>
    );
};