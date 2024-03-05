"use client";

import { Container } from "@mui/material";
import { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
    return (
        <Container
            component="main"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#ffffffbb",
            }}
        >
            {children}
        </Container>
    );
};

export default Main;
