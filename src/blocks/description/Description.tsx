import React from "react";
import { css } from "emotion";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { TextField } from "../../components/text-field";
import { FieldArray } from "formik";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { IBlockProps } from "../IBlockProps";

const classNames = {
    wrapper: css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 24px;
        grid-column-gap: 24px;
        margin-bottom: 24px;
    `,
    field: css`
        width: 400px;
    `,
    deleteButton: css`
        margin-left: 10px;
    `,
    textArea: css`
        width: 600px;
    `,
    row: css`
        display: flex;
        align-items: center;
    `,
};

const ValidationSchema = Yup.object().shape({
    data: Yup.array().of(Yup.string().required("Поле обязательно для заполнения")),
});

export const Description = (props: IBlockProps<string[]>) => {
    const { statuses, block, onSubmit, onDelete } = props;

    return (
        <BlockWrapper<string[]>
            block={block}
            validationSchema={ValidationSchema}
            statuses={statuses}
            onSubmit={onSubmit}
            onDelete={onDelete}
            render={(form) => (
                <React.Fragment>
                    <div
                        className={css`
                            display: flex;
                        `}
                    >
                        <FieldArray
                            name={"data"}
                            render={(array) => (
                                <div>
                                    <div className={classNames.wrapper}>
                                        {form?.values?.data &&
                                            form?.values.data.map((row, index) => (
                                                <div className={classNames.row} key={index}>
                                                    <TextField
                                                        name={`data.${index}`}
                                                        label={`Текст ${index + 1}`}
                                                        textarea
                                                        classes={{ root: classNames.textArea }}
                                                    />
                                                    <IconButton
                                                        onClick={() => array.remove(index)}
                                                        className={classNames.deleteButton}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </div>
                                            ))}
                                    </div>
                                    <IconButton onClick={() => array.push("")} color="primary">
                                        <Add />
                                    </IconButton>
                                </div>
                            )}
                        />
                    </div>
                </React.Fragment>
            )}
        />
    );
};
