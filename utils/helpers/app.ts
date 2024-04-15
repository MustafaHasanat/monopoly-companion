import { Dispatch, UnknownAction } from "redux";
import { controlsSlice } from "../redux/controls-slice";
import { AlertColor } from "@mui/material";

export const snackbarAlert = (
    message: string,
    severity: AlertColor,
    dispatch: Dispatch<UnknownAction>,
) => {
    dispatch(
        controlsSlice.actions.setSnackbarState({
            snackbarState: {
                message,
                severity,
            },
        }),
    );
};
