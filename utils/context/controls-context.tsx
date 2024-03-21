"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from "react";
import { AlertColor, AlertPropsColorOverrides, ThemeProvider, createTheme } from "@mui/material";
import getDesignTokens from "@/utils/styles/theme";
import { ModalContentType } from "../types";

export interface SnackbarStateType {
    message: string;
    severity: AlertColor;
}

export const ControlsContext = createContext({
    toggleColorMode: () => {},
    modalContent: "none" as ModalContentType,
    setModalIsOpen: (state: ModalContentType) => {},
    snackbarState: {
        message: "none",
        severity: "success",
    },
    setSnackbarState: (state: SnackbarStateType) => {},
});

export function ControlsProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">("dark");
    const [modalContent, setModalContent] = useState<ModalContentType>("none");
    const [snackbarState, setSnackbarState] = useState<SnackbarStateType>({
        message: "none",
        severity: "success",
    });

    const provider = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
            modalContent,
            snackbarState,
            setModalIsOpen: (state: ModalContentType) => {
                setModalContent(state);
            },
            setSnackbarState: (state: SnackbarStateType) => {
                setSnackbarState(state);
            },
        }),
        [mode, setMode, modalContent, snackbarState]
    );

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ControlsContext.Provider value={provider}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ControlsContext.Provider>
    );
}
