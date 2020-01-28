import React from "react";
import { Paper } from "@material-ui/core";
import { css } from "emotion";

interface IBlockWrapperProps<T> {
    title: string;
    id: string;

    onDelete?(id: string): void;

    onSubmit?(data: T): Promise<void>;
}

const classNames = {
    wrapper: css`
        padding: 24px;
    `,

};

export const BlockWrapper = <T extends object>(props: IBlockWrapperProps<T>) => {
    const {title, id, onDelete, onSubmit} = props;

    return (
        <Paper className={classNames.wrapper}>
            123
        </Paper>
    );
};
