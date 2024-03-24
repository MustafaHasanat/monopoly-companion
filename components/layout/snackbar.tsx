"use client";

import { ControlsContext } from "@/utils/context/controls-context";
import { controlsSlice, selectControls } from "@/utils/redux/controls-slice";
import { Alert, AlertColor, Slide, SlideProps, Snackbar } from "@mui/material";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const SnackbarWrapper = () => {
    // const { snackbarState, setSnackbarState } = useContext(ControlsContext);
    const dispatch = useDispatch();
    const { snackbarState } = useSelector(selectControls);

    const SlideTransition = (props: SlideProps) => {
        return <Slide {...props} direction="up" />;
    };

    const handleClose = () => {
        dispatch(
            controlsSlice.actions.setSnackbarState({
                snackbarState: {
                    message: "none",
                    severity: "success",
                },
            })
        );
        // setSnackbarState({ message: "none", severity: "success" });
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={snackbarState.message !== "none"}
            onClose={handleClose}
            autoHideDuration={3000}
            TransitionComponent={SlideTransition}
        >
            <Alert
                onClose={handleClose}
                severity={snackbarState.severity as AlertColor}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {snackbarState.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarWrapper;
