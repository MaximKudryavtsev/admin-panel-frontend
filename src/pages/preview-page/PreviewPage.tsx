import React from "react";
import { css } from "emotion";

const classNames = {
    wrapper: css`
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `,
    image: css`
        height: 500px;
    `
};

const NOT_READY_PAGE = require("./not-working-yet.jpg");

export const PreviewPage = () => {
    return (
        <div className={classNames.wrapper}>
            <img src={NOT_READY_PAGE} alt="" className={classNames.image} />
            <h1>Пока не готово</h1>
        </div>
    );
};
