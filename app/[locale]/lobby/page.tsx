"use client";

import Main from "@/components/layout/main";
import LobbyContainer from "@/components/lobby";

export default function Lobby() {
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
            <LobbyContainer />
        </Main>
    );
}
