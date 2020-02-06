import React from "react";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { css } from "emotion";
import { FieldArray } from "formik";
import { Card, IconButton } from "@material-ui/core";
import { TextField } from "../../components/text-field";
import { Add, Delete } from "@material-ui/icons";
import { SwitchField } from "../../components/switch-field";
import { IBlockProps } from "../IBlockProps";

export interface IFactBlock {
    title: string;
    description: string;
}

const ValidationSchema = Yup.object().shape({
    data: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required("Поле обязательно для заполнения"),
            description: Yup.string().required("Поле обязательно для заполнения"),
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

export const FactsBlock = (props: IBlockProps<IFactBlock[]>) => {
    return (
        <BlockWrapper<IFactBlock[]>
            {...props}
            validationSchema={ValidationSchema}
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
                                            name={`data.${index}.title`}
                                            label={"Заголовок"}
                                            classes={{ root: classNames.field }}
                                        />
                                        <TextField
                                            name={`data.${index}.description`}
                                            label={"Подпись"}
                                            classes={{ root: classNames.field }}
                                        />
                                    </Card>
                                ))}
                            </div>
                            <IconButton
                                onClick={() => array.push({ title: "", description: "", visible: true })}
                                color="primary"
                            >
                                <Add />
                            </IconButton>
                        </div>
                    )}
                </FieldArray>
            )}
        />
    );
};
