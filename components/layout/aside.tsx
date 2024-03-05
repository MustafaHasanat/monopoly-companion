"use client";

import { Box } from "@mui/material";
import useLocale from "@/hooks/useLocale";

const Aside = () => {
    const { getDictLocales, getLocale } = useLocale();
    const locale = getLocale();
    const {} = getDictLocales();

    return (
        <Box
            component="aside"
            sx={{
                height: "100%",
                backgroundColor: "#ffffff77",
            }}
        >
            This is the Aside
        </Box>
    );
};

export default Aside;
