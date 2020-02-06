import React from "react";
import { IBlockProps } from "../IBlockProps";
import * as Yup from "yup";
import { css } from "emotion";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { FieldArray } from "formik";
import { TextField } from "../../components/text-field";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const ValidationSchema = Yup.object().shape({
    data: Yup.array().of(Yup.string().required("Поле обязательно для заполнения")),
});

const classNames = {
    content: css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        margin-bottom: 24px;
    `,
    row: css`
        display: flex;
        align-items: center;
    `,
    icon: css`
        margin-left: 10px;
    `,
};

export const BlueLinesList = (props: IBlockProps<string[]>) => {
    return (
        <BlockWrapper<string[]>
            {...props}
            validationSchema={ValidationSchema}
            render={(form) => (
                <FieldArray
                    name={"data"}
                    render={(array) => (
                        <div>
                            <div className={classNames.content}>
                                {form?.values?.data?.map((item, index) => (
                                    <div className={classNames.row} key={index}>
                                        <TextField
                                            name={`data.${index}`}
                                            label={`Текст ${index + 1}`}
                                            textarea
                                        />
                                        <IconButton
                                            onClick={() => array.remove(index)}
                                            classes={{ root: classNames.icon }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                            <IconButton onClick={() => array.push("")} color={"primary"}>
                                <Add />
                            </IconButton>
                        </div>
                    )}
                />
            )}
        />
    );
};
