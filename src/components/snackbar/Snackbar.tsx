/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { IconButton, Snackbar as MaterialSnackbar, SnackbarContent } from "@material-ui/core";
import {
    CheckCircle as CheckCircleIcon,
    Close as CloseIcon,
    Error as ErrorIcon,
} from "@material-ui/icons";
import * as React from "react";
import { green, red } from "@material-ui/core/colors";

interface ISnackbarProps {
    message: string;
    open: boolean;
    error: boolean;

    onClose?(event?: React.SyntheticEvent, reason?: string): void;
}

export const Snackbar: React.FC<ISnackbarProps> = ({ message, error, open, onClose }) => {
    return (
        <MaterialSnackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
        >
            <SnackbarContent
                css={css({
                    background: error ?  red[600] : green[600],
                    boxShadow: `0 4px 8px ${error ? red[600] : green[600]}`,
                })}
                message={
                    <span
                        css={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {error ? (
                            <ErrorIcon />
                        ) : (
                            <CheckCircleIcon />
                        )}
                        <span css={css`padding-left: 12px`}>{message}</span>
                    </span>
                }
                action={[
                    <IconButton key="close" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </MaterialSnackbar>
    );
};

Snackbar.displayName = "Snackbar";
