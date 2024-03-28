"use client";

import { CircularProgress, Typography } from "@mui/material";
import Main from "../layout/main";
import useLocale from "@/hooks/useLocale";

interface Props {
    phrase?: string;
}

const LoadingPage = ({ phrase }: Props) => {
    const { getDictLocales } = useLocale();
    const { global } = getDictLocales();

    return (
        <Main
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                gap: 5,
            }}
        >
            <Typography variant="h3" textAlign="center">
                {phrase || global.loading}
            </Typography>
            <CircularProgress size={100} />
        </Main>
    );
};

export default LoadingPage;
