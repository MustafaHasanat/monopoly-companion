import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_GAME_DATA } from "../constants";
import { GameType, StorePayload } from "../types";

interface initialStateProps {
    game: GameType;
}

const initialState = {
    game: INITIAL_GAME_DATA,
} as initialStateProps;

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGame: (
            state: { game: GameType },
            { payload: { game } }: StorePayload<{ game: GameType }>
        ) => {
            state.game = game;
        },
    },
});

export const { setGame } = gameSlice.actions;

export const selectGame = (state: { game: initialStateProps }) => state.game;
