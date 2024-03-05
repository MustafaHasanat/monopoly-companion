"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import getDesignTokens from "@/libs/styles/theme";
import { ModalContentType } from "../types";

export const ControlsContext = createContext({
    toggleColorMode: () => {},
    modalContent: "none" as ModalContentType,
    setModalIsOpen: (state: ModalContentType) => {},
});

export function ControlsProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">("dark");
    const [modalContent, setModalContent] = useState<ModalContentType>("none");

    const provider = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
            modalContent,
            setModalIsOpen: (state: ModalContentType) => {
                setModalContent(state);
            },
        }),
        [mode, setMode, modalContent]
    );

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ControlsContext.Provider value={provider}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ControlsContext.Provider>
    );
}
