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
        height: 100%;
    `,
    button: css`
        position: fixed !important;
        right: 24px;
        bottom: 24px;
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
