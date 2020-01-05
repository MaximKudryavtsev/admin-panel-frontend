import React, { useEffect, useState } from "react";
import { css } from "emotion";
import { Chip, Grid } from "@material-ui/core";
import { useSnackbar, useUser } from "../../hooks";
import { Card } from "../../components/card";
import { UploadAvatar } from "../../widgets/upload-avatar";
import { Snackbar } from "../../components/snackbar";
import { IUser } from "../../entities";
import { UpdateUserForm } from "../../widgets/update-user-form";

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
            .then(() => setSnackbarState({ open: true, message: "Логин изенен!" }))
            .catch(() => {
                setSnackbarError(true);
                setSnackbarState({ open: true, message: "Ошибка сервера" });
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
