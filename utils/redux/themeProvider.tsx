import { createTheme, ThemeProvider as ThemeProviderMUI } from "@mui/material";
import { useMemo } from "react";
import getDesignTokens from "../styles/theme";
import { useSelector } from "react-redux";
import { selectControls } from "./controls-slice";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { colorMode } = useSelector(selectControls);

    const theme = useMemo(() => createTheme(getDesignTokens(colorMode)), [colorMode]);

    return <ThemeProviderMUI theme={theme}>{children}</ThemeProviderMUI>;
};

export default ThemeProvider;
