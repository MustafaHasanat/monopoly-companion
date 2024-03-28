"use client";

import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import Main from "@/components/layout/main";
import StackedCards from "@/components/shared/stackedCards/stackedCards";
import useAuthGuard from "@/hooks/useAuthGuard";
import { AuthPage } from "@/utils/types";
import { useSearchParams } from "next/navigation";

export default function Auth() {
    const searchParams = useSearchParams();
    const activePage: AuthPage = searchParams.get("active") as AuthPage;
    const { isAccessible, loadingComponent } = useAuthGuard({ page: "auth" });

    return (
        <Main
            sx={{
                justifyContent: "center",
                py: { mobile: "10px", laptop: "60px" },
                minHeight: { mobile: "80vh", laptop: "100vh" },
            }}
        >
            {!isAccessible ? (
                loadingComponent
            ) : (
                <StackedCards
                    topCardIsActive={activePage === "login"}
                    topCard={<Login />}
                    bottomCard={<Register />}
                    offsetMove={400}
                    boxSX={{
                        width: { mobile: "80vw", laptop: "30vw" },
                        height: { mobile: "55vh", laptop: "70vh" },
                    }}
                />
            )}
        </Main>
    );
}
