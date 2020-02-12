import React from "react";
import { css } from "emotion";
import { IBlueLinesListBlock } from "../../blocks/blue-lines-list";

const classNames = {
    blocks: css`
        display: grid !important;
        grid-row-gap: 48px;
        grid-column-gap: 140px;
        grid-template-columns: 1fr 1fr;
    `,
    item: css`
        width: 100%;
        display: flex;
        position: relative;
        flex-wrap: nowrap;
        box-sizing: border-box;
    `,
    line: css`
        width: 5px;
        height: auto;
        background-color: #0061f3;
    `,
    text: css`
        line-height: 24px;
        padding-left: 18px;
        font-size: 16px;
        font-family: Ubuntu;
    `,
    title: css`
        color: rgb(160, 160, 160);
        font-family: Ubuntu;
        text-transform: uppercase;
        margin-bottom: 36px;
        font-size: 16px;
    `,
};

export const PreviewBlueLineList = (props: { data: IBlueLinesListBlock }) => (
    <div>
        <div className={classNames.title}>{props.data.title}</div>
        <div className={classNames.blocks}>
            {props.data.blocks.map((item, index) => (
                <div className={classNames.item} key={index}>
                    <div className={classNames.line} />
                    <div className={classNames.text}>{item}</div>
                </div>
            ))}
        </div>
    </div>
);
