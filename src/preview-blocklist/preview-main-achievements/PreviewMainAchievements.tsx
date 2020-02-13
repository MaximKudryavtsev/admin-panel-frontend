import React from "react";
import { IMainAchievementsBlock } from "../../blocks/main-achievements-block";
import { css } from "emotion";

export const classNames = {
    wrapper: css`
        display: grid;
        grid-column-gap: 140px;
        grid-row-gap: 48px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    image: css`
        width: 220px;
        margin-bottom: 17px;
    `,
    title: css`
        font-size: 22px;
        line-height: 130%;
        font-family: Ubuntu;
        text-align: center;
    `,
};

export const PreviewMainAchievements = (props: { data: IMainAchievementsBlock }) => (
    <div className={classNames.wrapper}>
        {props.data.blocks.map((item, index) => (
            <div key={index}>
                <img src={item.imageLink} alt={item.title} className={classNames.image} />
                <div className={classNames.title}>{item.title}</div>
            </div>
        ))}
    </div>
);
