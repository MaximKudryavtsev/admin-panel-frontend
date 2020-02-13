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

interface IAddress {
    city: string;
    address: string;
    phone: string;
    workingHours: string;
}

interface IAddressBlock {
    blocks: IAddress[];
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        blocks: Yup.array().of(
            Yup.object().shape({
                city: Yup.string().required("Поле обязательно для заполнения"),
                address: Yup.string().required("Поле обязательно для заполнения"),
                phone: Yup.string().required("Поле обязательно для заполнения"),
                workingHours: Yup.string().required("Поле обязательно для заполнения"),
                visible: Yup.boolean(),
            }),
        ),
    }),
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
    `,
};

export const AddressBlock = (props: IBlockProps<IAddressBlock>) => {
    return (
        <BlockWrapper<IAddressBlock>
            {...props}
            validationSchema={ValidationSchema}
            render={(form) => (
                <FieldArray name={"data.blocks"}>
                    {(array) => (
                        <div>
                            <div className={classNames.wrapper}>
                                {form?.values?.data?.blocks?.map((item, index) => (
                                    <Card
                                        key={index}
                                        classes={{ root: classNames.card }}
                                        variant={"outlined"}
                                    >
                                        <div className={classNames.cardHeader}>
                                            <SwitchField
                                                name={`data.blocks.${index}.visible`}
                                                classes={{ root: classNames.switch }}
                                            />
                                            <IconButton onClick={() => array.remove(index)}>
                                                <Delete />
                                            </IconButton>
                                        </div>
                                        <TextField
                                            name={`data.blocks.${index}.city`}
                                            label={"Город"}
                                            classes={{ root: classNames.field }}
                                        />
                                        <TextField
                                            name={`data.blocks.${index}.address`}
                                            label={"Адрес"}
                                            classes={{ root: classNames.field }}
                                            textarea
                                        />
                                        <TextField
                                            name={`data.blocks.${index}.phone`}
                                            label={"Телефон"}
                                            classes={{ root: classNames.field }}
                                        />
                                        <TextField
                                            name={`data.blocks.${index}.workingHours`}
                                            label={"Рабочие часы"}
                                            classes={{ root: classNames.field }}
                                        />
                                    </Card>
                                ))}
                            </div>
                            <IconButton
                                onClick={() =>
                                    array.push({
                                        city: "",
                                        address: "",
                                        phone: "",
                                        workingHours: "",
                                        visible: true,
                                    })
                                }
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
