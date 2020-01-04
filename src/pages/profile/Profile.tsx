import React, { useEffect, useState } from "react";
import { css } from "emotion";
import { Button, Chip, Grid, IconButton, Tooltip } from "@material-ui/core";
import { useSnackbar, useUser } from "../../hooks";
import { Card } from "../../components/card";
import { UploadAvatar } from "../../widgets/upload-avatar";
import { Snackbar } from "../../components/snackbar";
import { CustomForm } from "../../components/custom-form";
import { IUser } from "../../entities";
import { TextField } from "../../components/text-field";
import * as Yup from "yup";
import { Info, Save } from "@material-ui/icons";
import cn from "classnames";

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
    field: css`
        margin-bottom: 20px !important;
    `,
    emailWrapper: css`
        display: flex;
        align-items: center;
    `,
    info: css`
        margin-left: 20px;
    `,
};

const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Невалидный e-mail")
        .required("Поле обязательно для заполнения"),
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
                                        <>
                                            <TextField
                                                name={"login"}
                                                label={"Логин"}
                                                classes={{
                                                    root: classes.field,
                                                }}
                                                InputLabelProps={{ shrink: !!form?.values?.login }}
                                            />
                                            <div
                                                className={cn(classes.emailWrapper, classes.field)}
                                            >
                                                <TextField
                                                    name={"email"}
                                                    label={"E-mail"}
                                                    InputLabelProps={{
                                                        shrink: !!form?.values?.email,
                                                    }}
                                                />
                                                <Tooltip
                                                    title={
                                                        "Если Вы смените E-mail, то Вам нужно будет подвердить новый E-mail, и после смены E-mail'a Вы будете разлогинены"
                                                    }
                                                    className={classes.info}
                                                >
                                                    <Info color={"primary"} />
                                                </Tooltip>
                                            </div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<Save />}
                                                onClick={form?.submitForm}
                                            >
                                                Сохранить
                                            </Button>
                                        </>
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
