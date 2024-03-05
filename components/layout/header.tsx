"use client";

import { AppBar } from "@mui/material";
import useLocale from "@/hooks/useLocale";

const Header = () => {
    const { getDictLocales, getLocale } = useLocale();
    const locale = getLocale();
    const {} = getDictLocales();

    return (
        <AppBar
            component="header"
            sx={{
                position: "fixed",
                left: locale === "en" ? "50%" : "0",
                right: locale === "en" ? "0" : "50%",
                transform: `translateX(${locale === "en" ? "-50%" : "50%"})`,
                zIndex: 100,
                width: "100vw",
                height: "70px",
                direction: "ltr",
            }}
        >
            This is the Header
        </AppBar>
    );
};

export default Header;
