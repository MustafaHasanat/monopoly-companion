import CreateGame from "@/components/lobby/createGame";
import JoinGame from "@/components/lobby/joinGame";
import LobbyWindow from "@/components/lobby/lobbyWindow";
import StartGame from "@/components/lobby/startGame";
import WaitingGame from "@/components/lobby/waitingGame";
import { CordsType, GameType } from "@/utils/types";
import { Container } from "@mui/material";
import { useState } from "react";

const LobbyContainer = () => {
    const [cords, setCords] = useState<CordsType>({
        x: 0,
        y: 1,
    });
    const [game, setGame] = useState<GameType | null>(null)

    return (
        <Container
            sx={{
                position: "relative",
                top: {
                    mobile: `${cords.y * -80}vh`,
                    laptop: `${cords.y * -100}vh`,
                },
                left: {
                    mobile: `${cords.x * -100}vw`,
                    laptop: `${cords.x * -100}vw`,
                },
                minHeight: { mobile: "240vh", laptop: "300vh" },
                width: { mobile: "200vw", laptop: "200vw" },
                transition: "top 0.5s ease, left 0.5s ease",
            }}
        >
            <LobbyWindow cords={{ x: 0, y: 0 }}>
                <CreateGame setCords={setCords} />
            </LobbyWindow>
            <LobbyWindow cords={{ x: 0, y: 1 }}>
                <StartGame setCords={setCords} />
            </LobbyWindow>
            <LobbyWindow cords={{ x: 0, y: 2 }} >
                <JoinGame setCords={setCords} setGame={setGame} />
            </LobbyWindow>
            <LobbyWindow cords={{ x: 1, y: 2 }}>
                <WaitingGame setCords={setCords} game={game} />
            </LobbyWindow>
        </Container>
    );
};

export default LobbyContainer;
