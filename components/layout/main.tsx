"use client";

import { Container, SxProps, useTheme } from "@mui/material";
import { ReactNode } from "react";
import Background from "./bg";

const Main = ({ children, sx }: { children: ReactNode; sx?: SxProps }) => {
    const theme = useTheme();

    return (
        <Container
            component="main"
            sx={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                backgroundColor: theme.palette.secondary.main,
                ...sx,
            }}
        >
            {/* <Background /> */}
            {children}
        </Container>
    );
};

export default Main;
