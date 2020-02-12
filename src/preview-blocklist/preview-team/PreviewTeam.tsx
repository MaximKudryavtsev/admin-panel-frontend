import React from "react";
import { ITeamBlock } from "../../blocks/team";
import { css } from "emotion";

const classNames = {
    title: css`
        color: rgb(160, 160, 160);
        font-family: Ubuntu;
        text-transform: uppercase;
        font-size: 16px;
        margin-bottom: 36px;
    `,
    content: css`
        display: grid;
        grid-row-gap: 48px;
        grid-column-gap: 15px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    photo: css`
        width: 100%;
        margin-bottom: 16px;
    `,
    name: css`
        font-size: 24px;
        line-height: 120%;
        margin-bottom: 8px;
        font-family: Ubuntu;
    `,
    position: css`
        color: #a0a0a0;
        line-height: 24px;
        font-size: 16px;
    `,
};

export const PreviewTeam = (props: { data: ITeamBlock }) => (
    <div>
        <div className={classNames.title}>{props.data.title}</div>
        <div className={classNames.content}>
            {props.data.blocks.map((item, index) => (
                <div>
                    <img src={item.imageLink} className={classNames.photo} alt="" />
                    <div className={classNames.name}>{item.name}</div>
                    <div className={classNames.position}>{item.position}</div>
                </div>
            ))}
        </div>
    </div>
);
