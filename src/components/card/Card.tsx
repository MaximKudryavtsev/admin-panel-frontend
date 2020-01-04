import React, { FC } from "react";
import { css } from "emotion";
import { Paper, Typography } from "@material-ui/core";

interface ICardProps {
    title: string;
}

const styles = {
    card: css`
        padding: 24px
    `,
    content: css`
        margin-top: 20px;
    `
};

export const Card: FC<ICardProps> = (props) => {
    const { title, children } = props;
    return (
        <Paper className={styles.card} elevation={3}>
            <Typography variant={"h6"}>{title}</Typography>
            <div className={styles.content}>{children}</div>
        </Paper>
    );
};
