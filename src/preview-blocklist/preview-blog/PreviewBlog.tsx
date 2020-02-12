import React from "react";
import { IBlog } from "../../blocks/blog";
import { css } from "emotion";

const classNames = {
    title: css`
        color: rgb(160, 160, 160);
        font-family: Ubuntu;
        text-transform: uppercase;
        font-size: 16px;
    `,
    link: css`
        color: rgb(0, 97, 243);
        font-family: Ubuntu;
        font-size: 16px;
        margin-left: auto;
        text-decoration: none;
    `,
    header: css`
        margin-bottom: 36px;
        display: flex;
    `,
    content: css`
        display: grid;
        grid-column-gap: 48px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    image: css`
        width: 100%;
        height: 180px;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        justify-content: center;
    `,
    name: css`
        font-size: 22px;
        line-height: 120%;
        margin-bottom: 10px;
        font-family: Ubuntu;
        color: #000;
    `,
    text: css`
        font-family: UbuntuRegular;
        color: rgb(160, 160, 160);
        text-transform: inherit;
        line-height: 140%;
        font-family: Ubuntu;
    `,
};

export const PreviewBlog = (props: { data: IBlog }) => (
    <div>
        <div className={classNames.header}>
            <div className={classNames.title}>{props.data.title}</div>
            <a className={classNames.link} href={props.data.link}>
                Все новости
            </a>
        </div>
        <div className={classNames.content}>
            {props.data.blocks.map((item, index) => (
                <a
                    href={item.link}
                    target={"_blank"}
                    key={index}
                    className={css`
                        text-decoration: none;
                    `}
                >
                    <div
                        className={classNames.image}
                        style={{
                            background: `url(${item.imageLink}) no-repeat`,
                            backgroundSize: "cover",
                        }}
                    />
                    <div className={classNames.name}>{item.title}</div>
                    <div className={classNames.text}>{item.description}</div>
                </a>
            ))}
        </div>
    </div>
);
