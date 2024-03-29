import React, { useEffect, useMemo, useState } from "react";
import { css } from "emotion";
import { Chip, Divider, Grid, Typography } from "@material-ui/core";
import { Card } from "../../components/card";
import { IChangePasswordData, IUser } from "../../entities";
import { UpdateUserForm, ChangePassword, UploadAvatar } from "../../widgets";
import { getServerError } from "../../utils";
import { useSnackbar } from "notistack";
import { omit } from "lodash";
import { Transport } from "../../transport";
import { useProfile } from "../../hooks/useProfile";

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
    card: css`
        margin: 0 24px 24px 0;
    `,
};

export const Profile = (props: IProfileProps) => {
    const { setPageTitle, onSetUser } = props;
    const transport = useMemo(() => Transport.create(), []);
    const { user, updateUser, deleteUser, updateAvatar, updatePassword, deleteAvatar } = useProfile(transport);
    const { enqueueSnackbar } = useSnackbar();
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
        updateUser(omit(user, ["avatar"]))
            .then(() => enqueueSnackbar("Логин изменен!", { variant: "success" }))
            .catch(() => enqueueSnackbar("Ошибка сервера", { variant: "error" }));
    };

    const onUpdatePassword = (data: IChangePasswordData) => {
        setPasswordError(undefined);
        updatePassword(data)
            .then(() => enqueueSnackbar("Пароль изменен!", { variant: "success" }))
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
                            <Card title={"Роли"} classes={{ root: classes.card }}>
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
        </>
    );
};
