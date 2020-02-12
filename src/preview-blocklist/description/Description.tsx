import React from "react";
import { css } from "emotion";

interface Props {
    data: string[];
}

const classNames = {
    wrapper: css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 140px;
        grid-row-gap: 64px;
    `,
    text: css`
        font-family: Ubuntu;
        font-size: 16px;
        line-height: 140%;
    `,
};

export const Description = (props: Props) => (
    <div className={classNames.wrapper}>
        {props.data.map((item, index) => (
            <div className={classNames.text} key={index}>{item}</div>
        ))}
    </div>
);
