/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { FC } from "react";
import {
    Box,
    Button,
    Divider,
    Paper,
    Typography,
} from "@material-ui/core";

interface ILoginWrapperProps {
    title?: string;
    buttonTitle?: string;
    buttonDisable?: boolean;

    onSubmit?(): void;
}

const styles = {
    container: css`
        width: 100%;
        height: 100%;
        position: fixed;
        background: #f5f5f5;
    `,
    block: css`
        width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `,
    innerBlock: css`
        padding: 20px 40px;
    `,
    content: css`
        margin-bottom: 40px;
    `,
    button: css`
        margin-left: auto !important;
    `,
    footer: css`
        display: flex;
    `
};

export const LoginWrapper: FC<ILoginWrapperProps> = (props) => {
    const { title, onSubmit, buttonTitle = "Сохранить", children, buttonDisable } = props;

    return (
        <div css={styles.container}>
            <Paper css={styles.block}>
                <Box css={styles.innerBlock}>
                    <Typography variant="h3" align={"center"}>
                        {title}
                    </Typography>
                </Box>
                <Divider />
                <Box css={styles.innerBlock}>
                    <Box css={styles.content}>{children}</Box>
                    <Box css={styles.footer}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            css={styles.button}
                            disabled={buttonDisable}
                        >
                            {buttonTitle}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
};
