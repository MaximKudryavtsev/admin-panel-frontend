import React from "react";
import { IBlockProps } from "../IBlockProps";
import { css } from "emotion";
import { BlockWrapper } from "../../widgets/block-wrapper";
import * as Yup from "yup";
import { TextField } from "../../components/text-field";

export interface IQuoteBlock {
    title: string;
    text: string;
}

const classNames = {
    field: css`
        margin-bottom: 24px;
    `
};

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        title: Yup.string().required("Поле обязательно для заполнения"),
        text: Yup.string().required("Поле обязательно для заполнения"),
    })
});


export const QuoteBlock = (props: IBlockProps<IQuoteBlock>) => {
    return (
        <BlockWrapper<IQuoteBlock>
            {...props}
            validationSchema={ValidationSchema}
            render={() => (
                <React.Fragment>
                    <TextField name={"data.title"} label={"Заголовок"} classes={{root: classNames.field}}/>
                    <TextField name={"data.text"} label={"Текст"} textarea />
                </React.Fragment>
            )}
        />
    );
};
