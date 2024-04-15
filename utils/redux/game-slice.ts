import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_GAME_DATA } from "../constants";
import { GameType, Player, StorePayload } from "../types";

interface initialStateProps {
    game: GameType;
    players: Player[];
}

const initialState = {
    game: INITIAL_GAME_DATA,
    players: [],
} as initialStateProps;

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGame: (
            state: { game: GameType },
            { payload: { game } }: StorePayload<{ game: GameType }>,
        ) => {
            state.game = game;
        },
        clearGame: (state: { game: GameType }) => {
            state.game = INITIAL_GAME_DATA;
        },
        addPlayer: (
            state: { players: Player[] },
            { payload: { player } }: StorePayload<{ player: Player }>,
        ) => {
            state.players.push(player);
        },
        removePlayer: (
            state: { players: Player[] },
            { payload: { playerId } }: StorePayload<{ playerId: string }>,
        ) => {
            state.players = state.players.filter((player) => player.id !== playerId);
        },
        clearPlayers: (state: { players: Player[] }) => {
            state.players = [];
        },
    },
});

export const { setGame, addPlayer, removePlayer, clearPlayers } = gameSlice.actions;

export const selectGame = (state: { game: initialStateProps }) => state.game;
