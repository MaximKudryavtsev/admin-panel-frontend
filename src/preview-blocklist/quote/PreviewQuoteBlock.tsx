import React from "react";
import { IQuoteBlock } from "../../blocks/quote";
import { css } from "emotion";

const classNames = {
    title: css`
        color: rgb(160, 160, 160);
        font-family: Ubuntu;
        text-transform: uppercase;
        margin-bottom: 36px;
        font-size: 16px;
    `,
    description: css`
        font-family: Ubuntu;
        font-size: 36px;
        line-height: 48px;
    `,
};

export const PreviewQuoteBlock = (props: { data: IQuoteBlock }) => (
    <div>
        <div className={classNames.title}>{props.data.title}</div>
        <div className={classNames.description}>{props.data.text}</div>
    </div>
);
