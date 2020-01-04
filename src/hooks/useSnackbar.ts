import React, { Dispatch, SetStateAction, useState } from "react";

export interface ISnackbarState {
    open: boolean;
    message: string;
}

export function useSnackbar(): {
    error: boolean,
    snackbar: ISnackbarState,
    setSnackbarError: Dispatch<SetStateAction<boolean>>,
    setSnackbarState: Dispatch<SetStateAction<ISnackbarState>>,
    onSnackbarClose: (event?: React.SyntheticEvent, reason?: string) => void,
} {
    const [error, setSnackbarError] = useState(false); // success/error snackbar state
    const [snackbar, setSnackbarState] = useState({ open: false, message: "" }); // open/close snackbar

    function onSnackbarClose(event?: React.SyntheticEvent, reason?: string) {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarState({ open: false, message: "" });
        // wait till animation ends
        setTimeout(() => setSnackbarError(false), 100);
    }

    return {error, snackbar, setSnackbarError, setSnackbarState, onSnackbarClose};
}
