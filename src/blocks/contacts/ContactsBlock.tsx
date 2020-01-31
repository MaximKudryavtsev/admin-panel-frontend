import React from "react";
import { IBlockProps } from "../IBlockProps";
import * as Yup from "yup";
import { css } from "emotion";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { FieldArray } from "formik";
import { Card, IconButton } from "@material-ui/core";
import { SwitchField } from "../../components/switch-field";
import { Add, Delete } from "@material-ui/icons";
import { TextField } from "../../components/text-field";

interface IContactBlock {
    city: string;
    address: string;
    phone: string;
    workingHours: string;
}

const ValidationSchema = Yup.object().shape({
    data: Yup.array().of(
        Yup.object().shape({
            city: Yup.string().required("Поле обязательно для заполнения"),
            address: Yup.string().required("Поле обязательно для заполнения"),
            phone: Yup.string().required("Поле обязательно для заполнения"),
            workingHours: Yup.string().required("Поле обязательно для заполнения"),
            visible: Yup.boolean()
        }),
    ),
});

const classNames = {
    wrapper: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        margin-bottom: 24px;
    `,
    field: css`
        margin-bottom: 24px;
    `,
    card: css`
        padding: 24px;
        box-sizing: border-box;
    `,
    cardHeader: css`
        display: flex;
        width: 100%;
        justify-content: flex-end;
        margin-bottom: 5px;
    `,
    switch: css`
        margin-right: 10px;
    `
};

export const ContactsBlock = (props: IBlockProps<IContactBlock[]>) => {
    const { statuses, block, onDelete, onSubmit } = props;

    return (
        <BlockWrapper<IContactBlock[]>
            block={block}
            statuses={statuses}
            validationSchema={ValidationSchema}
            onDelete={onDelete}
            onSubmit={onSubmit}
            render={(form) => (
                <FieldArray name={"data"}>
                    {(array) => (
                        <div>
                            <div className={classNames.wrapper}>
                                {form?.values?.data?.map((item, index) => (
                                    <Card key={index} classes={{ root: classNames.card }} variant={"outlined"}>
                                        <div className={classNames.cardHeader}>
                                            <SwitchField
                                                name={`data.${index}.visible`}
                                                classes={{ root: classNames.switch }}
                                            />
                                            <IconButton onClick={() => array.remove(index)}>
                                                <Delete />
                                            </IconButton>
                                        </div>
                                        <TextField
                                            name={`data.${index}.city`}
                                            label={"Город"}
                                            classes={{ root: classNames.field }}
                                        />
                                        <TextField
                                            name={`data.${index}.address`}
                                            label={"Адрес"}
                                            classes={{ root: classNames.field }}
                                            textarea
                                        />
                                        <TextField
                                            name={`data.${index}.phone`}
                                            label={"Телефон"}
                                            classes={{ root: classNames.field }}
                                        />
                                        <TextField
                                            name={`data.${index}.workingHours`}
                                            label={"Рабочие часы"}
                                            classes={{ root: classNames.field }}
                                        />
                                    </Card>
                                ))}
                            </div>
                            <IconButton
                                onClick={() => array.push({ city: "", address: "", phone: "", workingHours: "", visible: true })}
                                color="primary"
                            >
                                <Add />
                            </IconButton>
                        </div>
                    )}
                </FieldArray>
            )}
        />)
};
