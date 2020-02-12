import React from "react";
import { css } from "emotion";
import { IFact } from "../../blocks/facts";

interface Props {
    data: {
        blocks: IFact[];
    };
}

const classNames = {
    wrapper: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 140px;
        grid-row-gap: 64px;
    `,
    title: css`
        color: rgb(113, 135, 166);
        font-family: Ubuntu;
        font-size: 80px;
        line-height: 100%;
        margin-bottom: 16px;
        font-weight: 700;
    `,
    description: css`
        font-size: 24px;
        line-height: 120%;
        font-family: Ubuntu;
    `,
};

export const FactBlock = (props: Props) => (
    <div className={classNames.wrapper}>
        {props.data.blocks.map((item, index) => (
            <div key={index}>
                <div className={classNames.title}>{item.title}</div>
                <div className={classNames.description}>{item.description}</div>
            </div>
        ))}
    </div>
);
