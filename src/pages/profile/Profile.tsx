import React, { useEffect, useState } from "react";
import { css } from "emotion";
import { Chip, Grid, IconButton } from "@material-ui/core";
import { useSnackbar, useUser } from "../../hooks";
import { Card } from "../../components/card";
import { UploadAvatar } from "../../widgets/upload-avatar";
import { Snackbar } from "../../components/snackbar";
import { CustomForm } from "../../components/custom-form";
import { IUser } from "../../entities";
import { TextField } from "../../components/text-field";
import { Save } from "@material-ui/icons";
import * as Yup from "yup";

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

const ValidationSchema = Yup.object().shape({
    login: Yup.string()
        .required("Поле обязательно для заполнения")
        .min(2, "Минимальная длина логина 2 символа"),
});

export const Profile = (props: IProfileProps) => {
    const { setPageTitle, onSetUser } = props;
    const { user, updateLogin, deleteUser, updateAvatar, updatePassword, deleteAvatar } = useUser();
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

    const onUpdateLogin = (user: Partial<IUser>) => {
        updateLogin(user)
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
                                <CustomForm<IUser>
                                    data={user}
                                    onSubmit={onUpdateLogin}
                                    validationSchema={ValidationSchema}
                                    render={(form) => (
                                        <div
                                            className={css`
                                                display: flex;
                                                width: 100%;
                                                align-items: center;
                                            `}
                                        >
                                            <TextField
                                                name={"login"}
                                                label={"Логин"}
                                                classes={{
                                                    root: css`
                                                        width: 90%;
                                                    `,
                                                }}
                                                InputLabelProps={{ shrink: !!form?.values?.login }}
                                                size={"small"}
                                            />
                                            <IconButton
                                                className={css`
                                                    margin-left: 20px !important;
                                                `}
                                                color={"primary"}
                                                onClick={form?.submitForm}
                                            >
                                                <Save />
                                            </IconButton>
                                        </div>
                                    )}
                                />
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
