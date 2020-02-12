import React from "react";
import { IFeedbackBlock } from "../../blocks/feedback-block";
import { css } from "emotion";

const classNames = {
    content: css`
        display: grid;
        grid-column-gap: 80px;
        grid-row-gap: 48px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    title: css`
        color: rgb(160, 160, 160);
        font-family: Ubuntu;
        text-transform: uppercase;
        font-size: 16px;
        margin-bottom: 36px;
    `,
    text: css`
        line-height: 140%;
        margin-bottom: 24px;
        font-family: Ubuntu;
        font-size: 16px;
    `,
    name: css`
        margin-bottom: 24px;
        font-family: Ubuntu;
        font-size: 16px;
        font-weight: 700;
    `,
    position: css`
        margin-bottom: 24px;
        font-family: Ubuntu;
        font-size: 16px;
        color: rgb(160, 160, 160);
    `
};

export const PreviewFeedbackBlock = (props: { data: IFeedbackBlock }) => (
    <div>
        <div className={classNames.title}>{props.data.title}</div>
        <div className={classNames.content}>
            {props.data.blocks.map((item, index) => (
                <div key={index}>
                    <img
                        src={item.imageLink}
                        className={css`
                            margin-bottom: 24px;
                        `}
                    />
                    <div className={classNames.text}>{item.text}</div>
                    <div className={classNames.name}>{item.name}</div>
                    <div className={classNames.position}>{item.position}</div>
                </div>
            ))}
        </div>
    </div>
);
