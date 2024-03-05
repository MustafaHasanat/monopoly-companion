"use client";

import { PaletteMode } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

declare module "@mui/material/styles" {
    interface Palette {
        newColor: Palette["primary"];
    }

    interface PaletteOptions {
        newColor?: PaletteOptions["primary"];
    }
}

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        laptop: true;
        desktop: true;
    }
}

const getDesignTokens = (colorMode: PaletteMode) => ({
    palette: {
        mode: colorMode,
        newColor: {
            main: "#2b2b2b",
            dark: "#2b2b2b",
            light: "#fff",
        },
        ...(colorMode === "dark"
            ? {
                  primary: {
                      main: deepPurple[700],
                  },
                  secondary: {
                      main: "#2b2b2b",
                      contrastText: "#fff",
                  },
              }
            : {
                  primary: {
                      main: deepPurple[700],
                  },
                  secondary: {
                      main: "#fff",
                      contrastText: "#2b2b2b",
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
