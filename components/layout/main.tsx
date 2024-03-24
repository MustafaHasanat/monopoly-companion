"use client";

import { Grid, SxProps, useTheme } from "@mui/material";
import { ReactNode } from "react";

const Main = ({ children, sx }: { children: ReactNode; sx?: SxProps }) => {
    const theme = useTheme();

    return (
        <Grid
            container
            component="main"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
            width="100%"
            minHeight={{ mobile: "100vh", laptop: "70vh" }}
            sx={{
                position: "relative",
                backgroundColor: theme.palette.secondary.main,
                ...sx,
            }}
        >
            {children}
        </Grid>
    );
};

export default Main;
