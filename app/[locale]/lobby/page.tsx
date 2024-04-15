"use client";

import Main from "@/components/layout/main";
import LobbyContainer from "@/components/lobby/lobbyContainer";
import { LobbyPage } from "@/utils/types";
import { useSearchParams } from "next/navigation";

export default function Lobby() {
    const searchParams = useSearchParams();
    const activePage: LobbyPage = searchParams.get("active") as LobbyPage;

    return (
        <Main
            sx={{
                maxHeight: { mobile: "80vh", laptop: "100vh" },
                minHeight: { mobile: "80vh", laptop: "100vh" },
                width: "100vw",
                overflow: "hidden",
                p: 0,
            }}
        >
            <LobbyContainer page={activePage || "start"} />
        </Main>
    );
}
