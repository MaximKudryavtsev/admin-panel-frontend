import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { css } from "emotion";
export { css } from "emotion";

const classNames = {
    loadingScreen: css`
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.6);
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
};

export const BlockLoadingScreen = () => (
    <div className={classNames.loadingScreen}>
        <CircularProgress color="primary" />
        <Typography
            className={css`
                margin-left: 24px;
            `}
            variant={"h6"}
            color={"primary"}
        >
            Загрузка...
        </Typography>
    </div>
);
