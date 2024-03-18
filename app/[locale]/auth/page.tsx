"use client";

import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import Main from "@/components/layout/main";
import StackedCards from "@/components/shared/stackedCards/stackedCards";
import { useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Auth() {
    const theme = useTheme();
    const searchParams = useSearchParams();
    const activePage = searchParams.get("active");

    return (
        <Main
            sx={{
                justifyContent: "center",
                py: "60px",
                minHeight: { mobile: "80vh", laptop: "100vh" },
            }}
        >
            <StackedCards
                topCardIsActive={activePage === "login"}
                topCard={<Login />}
                bottomCard={<Register />}
                offsetMove={400}
                boxSX={{
                    width: { mobile: "80vw", laptop: "30vw" },
                    height: { mobile: "65vh", laptop: "70vh" },
                }}
            />
        </Main>
    );
}
