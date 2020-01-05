import React, { useState } from "react";
import { IChangePasswordData } from "../../entities";
import { Button, IconButton, TextField as MaterialTextField, Typography } from "@material-ui/core";
import { css } from "emotion";
import { Edit, Save } from "@material-ui/icons";
import { CustomForm } from "../../components/custom-form";
import { Popup } from "../../components/popup";
import { TextField } from "../../components/text-field";
import * as Yup from "yup";
import { StringSchema } from "yup";

interface IChangePasswordProps {
    error?: string;

    onSubmit?(data: IChangePasswordData): void;
}

export const styles = {
    wrapper: css`
        display: flex;
    `,
    editButton: css`
        margin-left: 20px !important;
    `,
    formWrapper: css`
        padding: 0 24px 24px 24px;
    `,
    field: css`
        margin-bottom: 20px !important;
    `,
};

function equalTo(ref: any, msg: any): StringSchema {
    return Yup.string().test({
        name: "equalTo",
        exclusive: false,
        message: msg,
        params: {
            reference: ref.path,
        },
        test: function(value: any) {
            return value === this.resolve(ref);
        },
    });
}

Yup.addMethod(Yup.string, "equalTo", equalTo);

const ValidationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
    newPassword: Yup.string()
        .equalTo(Yup.ref("repeatPassword"), "Новый пароль и повтор пароля должны совпадать")
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
    repeatPassword: Yup.string()
        .equalTo(Yup.ref("newPassword"), "Новый пароль и повтор пароля должны совпадать")
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
});

export const ChangePassword = (props: IChangePasswordProps) => {
    const { error, onSubmit } = props;
    const [popupVisible, setPopupVisible] = useState(false);

    function onPopupOpen(): void {
        setPopupVisible(true);
    }

    function onPopupClose(): void {
        setPopupVisible(false);
    }

    return (
        <>
            <div className={styles.wrapper}>
                <MaterialTextField
                    variant="outlined"
                    fullWidth
                    label={"Пароль"}
                    type={"password"}
                    value={"********"}
                    disabled
                />
                <IconButton color={"primary"} onClick={onPopupOpen}>
                    <Edit />
                </IconButton>
            </div>
            <Popup open={popupVisible} title={"Сменить пароль"} onClose={onPopupClose}>
                <CustomForm<IChangePasswordData>
                    validationSchema={ValidationSchema}
                    onSubmit={onSubmit}
                    render={(form) => (
                        <div className={styles.formWrapper}>
                            <TextField
                                name={"currentPassword"}
                                label={"Текущий пароль"}
                                classes={{ root: styles.field }}
                                type={"password"}
                                error={!!error}
                            />
                            <TextField
                                name={"newPassword"}
                                label={"Новый пароль"}
                                classes={{ root: styles.field }}
                                type={"password"}
                                error={!!error}
                            />
                            <TextField
                                name={"repeatPassword"}
                                label={"Повторите пароль"}
                                classes={{ root: styles.field }}
                                type={"password"}
                                error={!!error}
                            />
                            {error && (
                                <Typography
                                    color={"error"}
                                    align={"center"}
                                    className={styles.field}
                                >
                                    {error}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                                onClick={form?.submitForm}
                                disabled={!form?.isValid}
                            >
                                Сохранить
                            </Button>
                        </div>
                    )}
                />
            </Popup>
        </>
    );
};
