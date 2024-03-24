import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { ModalContentType, StorePayload } from "../types";

export type ColorMode = "light" | "dark";

export interface SnackbarStateType {
    message: string;
    severity: AlertColor;
}

interface initialStateProps {
    colorMode: ColorMode;
    modalContent: ModalContentType;
    snackbarState: SnackbarStateType;
}

const initialState = {
    colorMode: "dark",
    modalContent: "none" as ModalContentType,
    snackbarState: {
        message: "none",
        severity: "success",
    },
} as initialStateProps;

export const controlsSlice = createSlice({
    name: "controls",
    initialState,
    reducers: {
        toggleColorMode: (state: { colorMode: ColorMode }) => {
            state.colorMode = state.colorMode === "light" ? "dark" : "light";
        },
        setModalContent: (
            state: { modalContent: ModalContentType },
            {
                payload: { modalContent },
            }: StorePayload<{ modalContent: ModalContentType }>
        ) => {
            state.modalContent = modalContent;
        },
        setSnackbarState: (
            state: { snackbarState: SnackbarStateType },
            {
                payload: { snackbarState },
            }: StorePayload<{ snackbarState: SnackbarStateType }>
        ) => {
            state.snackbarState = snackbarState;
        },
    },
});

export const { toggleColorMode, setModalContent, setSnackbarState } =
    controlsSlice.actions;

export const selectControls = (state: { controls: initialStateProps }) =>
    state.controls;
