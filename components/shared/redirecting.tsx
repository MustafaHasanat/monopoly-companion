"use client";

import useLocale from "@/hooks/useLocale";
import { CircularProgress, Container, Typography } from "@mui/material";

const Redirecting = ({}) => {
    const { getDictLocales } = useLocale();
    const { global } = getDictLocales();

    return (
        <Container
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
            <Typography variant="h3">{global.redirecting}</Typography>
            <CircularProgress size={100} />
        </Container>
    );
};

export default Redirecting;
