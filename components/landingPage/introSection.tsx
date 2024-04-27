"use client";

import useLocale from "@/hooks/useLocale";
import { Container, Typography } from "@mui/material";
import { ContainedButton } from "../shared/button";
import AnimatedBoard from "./animatedBoard";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";

const IntroSection = () => {
    const { getDictLocales } = useLocale();
    const { landingPage } = getDictLocales();
    const router = useRouter();
    const { session } = useSelector(selectAuth);

    return (
        <Container
            sx={{
                display: "grid",
                gridTemplateColumns: "70%",
                gridTemplateRows: "1fr 1fr 3fr",
                p: "50px",
                height: "70vh",
            }}
        >
            <Typography variant="h3">{landingPage.welcome}</Typography>

            {/* <AnimatedBoard
                sx={{
                    gridRow: "span 4",
                    m: "auto",
                }}
            /> */}

            <Typography
                variant="h5"
                m="auto 0"
                sx={{
                    opacity: 0.8,
                }}
            >
                {landingPage.slogan}
            </Typography>

            <ContainedButton
                onClick={() => {
                    router.replace(
                        session?.access_token ? "/lobby" : "/auth?active=login"
                    );
                }}
                sx={{
                    m: "auto 0",
                    fontSize: { mobile: "20px", laptop: "30px" },
                }}
            >
                {landingPage.button}
            </ContainedButton>
        </Container>
    );
};

export default IntroSection;
