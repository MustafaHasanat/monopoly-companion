import { Dispatch, UnknownAction } from "redux";
import { setSnackbarState } from "../redux/controls-slice";
import { AlertColor } from "@mui/material";

export const snackbarAlert = (
    message: string,
    severity: AlertColor,
    dispatch: Dispatch<UnknownAction>,
) => {
    dispatch(
        setSnackbarState({
            snackbarState: {
                message,
                severity,
            },
        }),
    );
};
