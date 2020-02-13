import React from "react";
import { IBestAchievementBlock } from "../../blocks/best-achievement-block";
import { css } from "emotion";

const classNames = {
    content: css`
        display: grid;
        grid-row-gap: 96px;
        grid-column-gap: 140px;
        grid-template-columns: 1fr 1fr;
    `,
    title: css`
        color: rgb(160, 160, 160);
        font-family: Ubuntu;
        text-transform: uppercase;
        margin-bottom: 36px;
        font-size: 16px;
    `,
    item: css`
        display: grid;
        align-items: center;
        grid-template-columns: 100px auto;
        width: 100%;
        position: relative;
        flex-wrap: wrap;
        box-sizing: border-box;
    `,
    image: css`
        width: 100px;
        height: 100px;
        background-repeat: no-repeat;
        background-position: center;
    `,
    info: css`
        box-sizing: border-box;
        margin-left: 20px;
    `,
    name: css`
        font-size: 36px;
        line-height: 48px;
        margin-bottom: 16px;
        font-family: Ubuntu;
    `,
    link: css`
        color: #0061f3;
        font-size: 24px;
        font-family: UbuntuRegular;
        line-height: 120%;
        text-decoration: none;
        font-family: Ubuntu;
    `,
};

export const PreviewBestAchievements = (props: { data: IBestAchievementBlock }) => (
    <div>
        <div className={classNames.title}>{props.data.title}</div>
        <div className={classNames.content}>
            {props.data.blocks.map((item, index) => (
                <div className={classNames.item} key={index}>
                    <div
                        className={classNames.image}
                        style={{ backgroundImage: `url(${item.imageLink})` }}
                    />
                    <div className={classNames.info}>
                        <div className={classNames.name}>{item.title}</div>
                        {item.links.map((link, linkIndex) => (
                            <a href={link.link} key={linkIndex} className={classNames.link} target={"_blank"}>
                                {link.title}{linkIndex !== item.links.length - 1 && ", "}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);
