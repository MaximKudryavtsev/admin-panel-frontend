import React from "react";
import { IAchievement, IAchievementBlock } from "../../blocks/achievement-block";
import { uniq } from "lodash";
import { css } from "emotion";

const classNames = {
    wrapper: css`
        display: grid;
        grid-row-gap: 96px;
        grid-template-rows: 1fr;
    `,
    title: css`
        color: rgb(160, 160, 160);
        font-family: Ubuntu;
        text-transform: uppercase;
        margin-bottom: 36px;
        font-size: 16px;
    `,
    row: css`
        display: grid;
        padding: 30px 0;
        border-top: 1px solid rgba(160, 160, 160, 0.3);
        box-sizing: border-box;
        align-items: center;
        grid-template-columns: 100px 1fr;
    `,
    image: css`
        height: 100px;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        background-repeat: no-repeat;
        background-position: center;
    `,
    info: css`
        display: grid;
        align-items: flex-end;
        grid-row-gap: 12px;
        padding-left: 20px;
        grid-template-columns: 1fr 1fr;
    `,
    achievement: css`
        font-size: 24px;
        text-align: left;
        line-height: 100%;
        font-family: Ubuntu;
        font-weight: 700;
    `,
    link: css`
        color: #0061f3;
        font-size: 36px;
        line-height: 36px;
        margin-left: auto;
        text-decoration: none;
        font-family: Ubuntu;
    `,
    position: css`
        font-size: 36px;
        text-align: right;
        line-height: 36px;
        color: rgb(113, 135, 166);
        font-family: Ubuntu;
    `,
    achievementName: css`
        font-size: 20px;
        align-self: flex-start;
        line-height: 120%;
        font-family: Ubuntu;
    `,
    product: css`
        font-size: 20px;
        align-self: flex-start;
        text-align: right;
        line-height: 120%;
        font-family: Ubuntu;
        color: rgb(160, 160, 160);
    `,
};

export const PreviewAchievementBlock = (props: { data: IAchievementBlock }) => {
    const { data } = props;
    const years = uniq(data.blocks.map((item) => new Date(item.date).getFullYear()));

    const getItemsByYear = (year: number): IAchievement[] => {
        return data.blocks.filter((item) => new Date(item.date).getFullYear() === year);
    };

    return (
        <div className={classNames.wrapper}>
            {years.map((year, index) => (
                <div key={index}>
                    <div className={classNames.title}>{year}</div>
                    {getItemsByYear(year).map((item, itemIndex) => (
                        <div className={classNames.row} key={itemIndex}>
                            <div
                                className={classNames.image}
                                style={{ backgroundImage: `url(${item.imageLink})` }}
                            />
                            <div className={classNames.info}>
                                <div className={classNames.achievement}>{item.title}</div>
                                {item.link ? (
                                    <a href={item.link} className={classNames.link}>
                                        {item.position}
                                    </a>
                                ) : (
                                    <div className={classNames.position}>{item.position}</div>
                                )}
                                <div className={classNames.achievementName}>
                                    {item.achievementName}
                                </div>
                                <div className={classNames.product}>{item.productName}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
