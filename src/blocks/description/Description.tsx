import React from "react";
import { css } from "emotion";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { IBlock, IDictionary } from "../../entities";
import { TextField } from "../../components/text-field";
import { FieldArray } from "formik";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

interface IDescriptionProps {
    statuses?: IDictionary[];
    block?: IBlock<string[][]>;
}

const classNames = {
    half: css`
        width: 50%;
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
    `
};

const ValidationSchema = Yup.object().shape({
    data: Yup.array().of(Yup.string().required("Поле обязательно для заполнения"))
});

export const Description = (props: IDescriptionProps) => {
    const { statuses, block } = props;

    const onSubmit = (data: IBlock<string[][]>) => {
        console.log(data);
    };

    return (
        <BlockWrapper<string[][]>
            block={block}
            validationSchema={ValidationSchema}
            statuses={statuses}
            onSubmit={onSubmit}
            render={(values) => (
                <React.Fragment>
                    <FieldArray
                        name={"data"}
                        render={(array) => (
                            <div className={css`display: flex;`}>
                                {values?.data && values.data.map((item, index) => (
                                    <div className={classNames.half} key={index}>
                                        {item.map((row, rowIndex) => (
                                            <div className={classNames.row} key={index}>
                                                <TextField
                                                    name={`data.${index}.${rowIndex}`}
                                                    label={`Текст ${index + 1}`}
                                                    textarea
                                                    classes={{root: classNames.textArea}}
                                                />
                                                <IconButton onClick={() => array.remove(index)} className={classNames.deleteButton}>
                                                    <Delete />
                                                </IconButton>
                                            </div>
                                        ))}
                                        <IconButton onClick={() => array.push("")} color="primary">
                                            <Add />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                </React.Fragment>
            )}
        />
    );
};
