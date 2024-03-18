"use client";

import { PaletteMode } from "@mui/material";
import { blue } from "@mui/material/colors";

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true;
        tablet: true;
        laptop: true;
        desktop: true;
    }
}

const getDesignTokens = (colorMode: PaletteMode) => ({
    palette: {
        mode: colorMode,
        ...(colorMode === "dark"
            ? {
                  primary: {
                      main: blue[600],
                      dark: blue[900],
                      light: blue[100],
                  },
                  secondary: {
                      main: "#1b1b1b",
                      contrastText: "#FFF4EF",
                  },
              }
            : {
                  primary: {
                      main: blue[500],
                  },
                  secondary: {
                      main: "#FFF4EF",
                      contrastText: "#1b1b1b",
                  },
              }),
    },
    typography: {
        fontFamily: "Oswald",
    },
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1200,
        },
    },
});

export default getDesignTokens;
