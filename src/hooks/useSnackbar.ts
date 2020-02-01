import React, { Dispatch, SetStateAction, useState } from "react";

export interface ISnackbarState {
    open: boolean;
    message: string;
    error: boolean;
}

export function useSnackbar(): {
    snackbar: ISnackbarState,
    setSnackbarState: Dispatch<SetStateAction<ISnackbarState>>,
    onSnackbarClose: (event?: React.SyntheticEvent, reason?: string) => void,
} {
    const [snackbar, setSnackbarState] = useState<ISnackbarState>({ open: false, message: "", error: false }); // open/close snackbar

    function onSnackbarClose(event?: React.SyntheticEvent, reason?: string) {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarState({ open: false, message: "", error: false });
    }

    return {snackbar, setSnackbarState, onSnackbarClose};
}
