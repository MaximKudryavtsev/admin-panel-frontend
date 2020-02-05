import React from "react";
import { EContactTypes, IContact, IDictionary, TLang } from "../../entities";
import { Popup } from "../../components/popup";
import * as Yup from "yup";
import { CustomForm } from "../../components/custom-form";
import { Select } from "../../components/select";
import { css } from "emotion";
import { TextField } from "../../components/text-field";
import { Save } from "@material-ui/icons";
import { isEqual } from "lodash";
import { Button } from "@material-ui/core";

interface IAddContactPopupProps {
    open: boolean;
    contact?: IContact;
    title?: string;
    contactTypes?: IDictionary[];
    lang?: TLang;

    onClose?(): void;

    onSubmit?(data: Partial<IContact>): void;
}

const ValidationSchema = Yup.object().shape({
    typeId: Yup.string().required("Поле обязательно для заполнения"),
    title: Yup.string().required("Поле обязательно для заполнения"),
    value: Yup.string().notRequired(),
});

const classNames = {
    content: css`
        padding: 24px;
    `,
    field: css`
        margin-bottom: 24px;
    `,
    buttonWrapper: css`
        display: flex;
        justify-content: flex-end;
    `,
};

export const AddContactPopup = (props: IAddContactPopupProps) => {
    const { contact, open, onClose, contactTypes = [], onSubmit, title = "" } = props;
    return (
        <Popup title={title} open={open} onClose={onClose}>
            <CustomForm<IContact>
                data={contact}
                onSubmit={onSubmit}
                validationSchema={ValidationSchema}
                render={(form) => (
                    <div className={classNames.content}>
                        <Select
                            name={"typeId"}
                            label={"Тип контакта"}
                            options={contactTypes.map((item) => ({
                                value: item._id,
                                label: item.title,
                            }))}
                            classes={{ root: classNames.field }}
                        />
                        {contactTypes.find((item) => item._id === form?.values.typeId)?.label ===
                        EContactTypes.PHONE ? (
                            <TextField
                                name={"title"}
                                label={"Телефон"}
                                classes={{ root: classNames.field }}
                            />
                        ) : (
                            <TextField
                                name={"title"}
                                label={"Email"}
                                classes={{ root: classNames.field }}
                            />
                        )}
                        <div className={classNames.buttonWrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                                onClick={form?.submitForm}
                                disabled={
                                    !form?.isValid || isEqual(form?.values, form?.initialValues)
                                }
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
