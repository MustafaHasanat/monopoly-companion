"use client";

import useLocale from "@/hooks/useLocale";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const Body = ({ children }: { children: ReactNode }) => {
    const { getLocale } = useLocale();
    const locale = getLocale();

    return (
        <Box
            component="body"
            sx={{
                direction: locale === "en" ? "ltr" : "rtl",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                minWidth: "100vw",
                minHeight: "100vh",
                p: { mobile: "70px 0 0 0", laptop: "70px 0 0 0" },
                m: 0,
            }}
        >
            {children}
        </Box>
    );
};

export default Body;
