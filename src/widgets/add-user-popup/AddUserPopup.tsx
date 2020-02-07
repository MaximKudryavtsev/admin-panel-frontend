import React, { useState } from "react";
import { EUserRoles, IDictionary, IUser, TCreateUserRequest } from "../../entities";
import { CustomForm } from "../../components/custom-form";
import { css } from "emotion";
import { Popup } from "../../components/popup";
import { TextField } from "../../components/text-field";
import { FieldArray } from "formik";
import { Button, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import * as Yup from "yup";

interface IAddUserPopupProps {
    open: boolean;
    roles?: IDictionary[];
    user?: IUser;
    title?: string;

    onSubmit?(data: TCreateUserRequest): void;

    onClose?(): void;
}

const classNames = {
    content: css`
        padding: 0 24px 24px 24px;
    `,
    button: css`
        width: 100%;
    `,
    field: css`
        margin-bottom: 24px;
    `,
    checkbox: css`
        margin-bottom: 10px;
        :last-of-type {
            margin-bottom: 0px;
        }
    `,
};

const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Поле обязательно для заполнения")
        .email("Невалидный e-mail"),
    roles: Yup.array()
        .min(1)
        .of(Yup.string().required("Поле обязательно для заполнения")),
});

export const AddUserPopup = (props: IAddUserPopupProps) => {
    const { roles = [], onSubmit, open, onClose, user, title = "" } = props;
    const [submitted, setSubmitted] = useState(false);

    const isSuperAdminChecked = (values?: string[]) => {
        const superAdminRole = roles.find((item) => item.label === EUserRoles.SUPER_ADMIN);
        if (!superAdminRole) {
            return false;
        }
        return values?.includes(superAdminRole._id);
    };

    const getFormData = () => {
        return user
            ? { roles: user.roles.map((item) => item._id), email: user.email, _id: user._id }
            : { roles: [], email: "", _id: "" };
    };

    return (
        <Popup open={open} title={title} onClose={onClose}>
            <CustomForm<TCreateUserRequest>
                onSubmit={onSubmit}
                validationSchema={ValidationSchema}
                data={getFormData()}
                render={(form) => {
                    return (
                        <div className={classNames.content}>
                            <TextField
                                name={"email"}
                                label={"Email"}
                                classes={{ root: classNames.field }}
                                disable={!!user}
                            />
                            <div className={classNames.field}>
                                <Typography>Роли:</Typography>
                                <FieldArray
                                    name={"roles"}
                                    render={(array) =>
                                        roles.map((item) => (
                                            <div className={classNames.checkbox} key={item._id}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                form?.values.roles.includes(
                                                                    item._id,
                                                                ) ||
                                                                isSuperAdminChecked(
                                                                    form?.values.roles,
                                                                )
                                                            }
                                                            onChange={(event, checked) => {
                                                                setSubmitted(false);
                                                                if (checked) {
                                                                    array.push(item._id);
                                                                } else {
                                                                    const index = form?.values.roles.indexOf(
                                                                        item._id,
                                                                    );
                                                                    array.remove(index!);
                                                                }
                                                            }}
                                                            value={item._id}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={item.title}
                                                />
                                            </div>
                                        ))
                                    }
                                />
                                {submitted && form?.values.roles.length === 0 && (
                                    <Typography color={"error"}>
                                        Вы не выбрали ни одной роли
                                    </Typography>
                                )}
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                                className={classNames.button}
                                onClick={() => {
                                    form?.submitForm();
                                    setSubmitted(true);
                                }}
                            >
                                Сохранить
                            </Button>
                        </div>
                    );
                }}
            />
        </Popup>
    );
};
