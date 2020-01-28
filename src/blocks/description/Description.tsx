import React from "react";
import { css } from "emotion";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { IBlock, IDictionary } from "../../entities";
import { TextField } from "../../components/text-field";
import { FieldArray } from "formik";
import { Icon, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";

export interface IDescription {
    title: string;
}

interface IDescriptionProps {
    statuses?: IDictionary[];
    block?: IBlock<string[]>;
}

const classNames = {
    field: css`
        width: 400px;
    `,
};

const ValidationSchema = Yup.object().shape({
    data: Yup.array().of(Yup.string().required("Поле обязательно для заполнения"))
});

export const Description = (props: IDescriptionProps) => {
    const { statuses, block } = props;

    const onSubmit = (data: IBlock<string[]>) => {
        console.log(data);
    };

    return (
        <BlockWrapper<string[]>
            block={block}
            validationSchema={ValidationSchema}
            statuses={statuses}
            onSubmit={onSubmit}
            render={(values) => (
                <React.Fragment>
                    <FieldArray
                        name={"data"}
                        render={(array) => (
                            <React.Fragment>
                                {values?.data &&
                                    values.data.map((item, index) => (
                                        <TextField
                                            name={`data.${index}`}
                                            label={`Текст${index + 1}`}
                                            textarea
                                        />
                                    ))}
                                <IconButton onClick={() => array.push("")} color="primary">
                                    <Add />
                                </IconButton>
                            </React.Fragment>
                        )}
                    />
                </React.Fragment>
            )}
        />
    );
};
