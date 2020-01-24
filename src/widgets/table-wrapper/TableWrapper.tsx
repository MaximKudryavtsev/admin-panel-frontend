import React, { FC } from "react";
import { css } from "emotion";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

interface ITableWrapperProps {
    buttonTitle?: string;

    handler?(): void;
}

const styles = {
    wrapper: css`
        width: calc(100% + 48px);
        height: 100%;
        transform: translateX(-24px);
    `,
    button: css`
        position: fixed !important;
        right: 24px;
        bottom: 0;
        z-index: 10;
    `,
};

export const TableWrapper: FC<ITableWrapperProps> = (props) => {
    const { buttonTitle = "Добавить", handler, children } = props;

    return (
        <div className={styles.wrapper}>
            {children}
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Add />}
                onClick={handler}
                className={styles.button}
            >
                {buttonTitle}
            </Button>
        </div>
    );
};
