"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { Session } from "@supabase/supabase-js";
import { createContext, useMemo, useState } from "react";
import { GameType, Player } from "../types";
import { INITIAL_GAME_DATA } from "../constants";

const initialValues: {
    game: GameType;
    setGame: (state: GameType) => void;
} = {
    game: INITIAL_GAME_DATA,
    setGame: (state: GameType) => {},
};

export const GameContext = createContext(initialValues);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [game, setGame] = useState<GameType>(INITIAL_GAME_DATA);

    const provider = useMemo(
        () => ({
            game,
            setGame: (state: GameType) => {
                setGame(state);
            },
        }),
        [game]
    );

    return (
        <GameContext.Provider value={provider}>{children}</GameContext.Provider>
    );
}
