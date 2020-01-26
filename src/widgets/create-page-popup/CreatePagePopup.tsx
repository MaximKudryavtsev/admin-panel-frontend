import React from "react";
import { css } from "emotion";
import { Popup } from "../../components/popup";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import { Button, Typography } from "@material-ui/core";
import * as Yup from "yup";
import { Save } from "@material-ui/icons";

interface ICreatePagePopupProps {
    visible: boolean;
    error?: string;

    onClose?(): void;

    onSubmit?(data: { title: string }): void;
}

const classNames = {
    wrapper: css`
        padding: 0 24px 24px 24px;
    `,
    field: css`
        margin-bottom: 30px !important;
    `,
};

const ValidationSchema = Yup.object().shape({
    title: Yup.string().required("Поле обязательно для заполнения"),
});

export const CreatePagePopup = (props: ICreatePagePopupProps) => {
    const { visible, onClose, onSubmit, error } = props;

    return (
        <Popup title={"Добавить страницу"} open={visible} onClose={onClose}>
            <CustomForm<{ title: string }>
                onSubmit={onSubmit}
                validationSchema={ValidationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                render={(form) => (
                    <div className={classNames.wrapper}>
                        <TextField
                            name={"title"}
                            classes={{ root: classNames.field }}
                            label={"Название страницы"}
                        />
                        {error && (
                            <Typography
                                color={"error"}
                                align={"center"}
                                className={classNames.field}
                            >
                                {error}
                            </Typography>
                        )}
                        <div className={css`display: flex; justify-content: flex-end;`}>
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
                    </div>
                )}
            />
        </Popup>
    );
};
