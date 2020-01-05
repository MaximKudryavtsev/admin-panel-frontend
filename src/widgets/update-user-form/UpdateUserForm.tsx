import React from "react";
import { IUser } from "../../entities";
import { TextField } from "../../components/text-field";
import cn from "classnames";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Info, Save } from "@material-ui/icons";
import { isEqual } from "lodash";
import { CustomForm } from "../../components/custom-form";
import * as Yup from "yup";
import { css } from "emotion";

interface IUpdateFormProps {
    user?: IUser;
    error?: string;

    onSubmit?(data: IUser): void;
}

const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Невалидный e-mail")
        .required("Поле обязательно для заполнения"),
    login: Yup.string()
        .required("Поле обязательно для заполнения")
        .min(2, "Минимальная длина логина 2 символа"),
});

const classes = {
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

export const UpdateUserForm = (props: IUpdateFormProps) => {
    const { user, error, onSubmit } = props;

    return (
        <CustomForm<IUser>
            data={user}
            onSubmit={onSubmit}
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
                            <IconButton>
                                <Info color={"primary"} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={form?.submitForm}
                        disabled={isEqual(form?.values, form?.initialValues)}
                    >
                        Сохранить
                    </Button>
                </>
            )}
        />
    );
};
