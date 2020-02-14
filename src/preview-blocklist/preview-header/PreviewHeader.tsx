import React from "react";
import { IClientHeader } from "../../entities";
import { css } from "emotion";
import { ArrowDownIcon } from "./ArrowDownIcon";
import { Link } from "react-router-dom";

const classNames = {
    wrapper: css`
        width: 100%;
        height: 68px;
        background: none;
        box-sizing: border-box;
        transition: background 0.3s ease;
        margin: 65px 0 90px -120px;
    `,
    header: css`
        display: flex;
        position: relative;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    `,
    logo: css`
        width: 123px;
        height: 26px;
        background-repeat: no-repeat;
    `,
    menuWrapper: css`
        width: 100%;
        display: flex;
        position: relative;
        box-sizing: border-box;
        align-items: center;
        padding-left: 8.333333333333334%;
    `,
    menu: css`
        display: flex;
        z-index: 5;
        position: relative;
    `,

    menuitem: css`
        cursor: pointer;
        height: 68px;
        display: flex;
        position: relative;
        box-sizing: border-box;
        align-items: center;
        line-height: 12px;
        margin-right: 40px;
        border-bottom: 4px solid transparent;
        letter-spacing: 0.1em !important;
        text-transform: uppercase;
        color: #000;
        font-size: 12px;
        font-family: Ubuntu;
    `,
    menuLink: css`
        padding: 27px 0 22px 0;
        font-size: 12px;
        font-family: Ubuntu;
        line-height: 12px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-family: Ubuntu;
        text-transform: uppercase;
        text-decoration: none;
        color: #000;
    `,
    button: css`
        right: 0;
        width: 250px;
        height: 68px;
        z-index: 5;
        position: absolute;
        font-size: 12px;
        transform: translate(370px, -3px);
        box-shadow: 0px 30px 60px rgba(0, 78, 255, 0.4);
        transition: all 0.3s ease;
        padding-left: 32px;
        border-radius: 6px 0 0 6px;
        justify-content: flex-start;
        color: #fff;
        cursor: pointer;
        display: flex;
        padding: 0 40px;
        font-size: 14px;
        box-sizing: border-box;
        align-items: center;
        font-family: UbuntuRegular;
        white-space: nowrap;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        background-color: #0061f3;
        text-decoration: none;
        font-family: Ubuntu;
    `,
};

export const PreviewHeader = (props: { header?: IClientHeader }) => (
    <div className={classNames.wrapper}>
        <div className={classNames.header}>
            <a href="/">
                <div
                    className={classNames.logo}
                    style={{ backgroundImage: `url(${props.header?.logoLink})` }}
                />
            </a>
            <div className={classNames.menuWrapper}>
                <div className={classNames.menu}>
                    {props.header?.navigations
                        .filter((item) => !item.parentId)
                        .map((item, index) => (
                            <>
                                {item.link ? (
                                    <div className={classNames.menuitem}>
                                        <Link
                                            to={`/pages/${item.link}/preview`}
                                            key={item._id}
                                            className={classNames.menuLink}
                                        >
                                            {item.title}
                                            {item.hasChild && <ArrowDownIcon />}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className={classNames.menuitem}>
                                        {item.title}
                                        {item.hasChild && <ArrowDownIcon />}
                                    </div>
                                )}
                            </>
                        ))}
                </div>
            </div>
            <Link to={`/pages/${props.header?.buttonLink}/preview`} className={classNames.button}>
                {props.header?.buttonTitle}
            </Link>
        </div>
    </div>
);
