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

const findPlayer = (id: string, players: Player[]): Player[] =>
    players.filter((player) => player.id === id);

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
            { payload: { player: newPlayer } }: StorePayload<{ player: Player }>,
        ) => {
            if (findPlayer(newPlayer.id, state.players).length === 0) {
                state.players.push(newPlayer);
            }
        },
        editPlayer: (
            state: { players: Player[] },
            {
                payload: { playerId, playerData },
            }: StorePayload<{ playerId: string; playerData: Partial<Player> }>,
        ) => {
            const playersResult = findPlayer(playerId, state.players);

            if (playersResult.length !== 0) {
                state.players = state.players.map((player) =>
                    player.id === playerId ? { ...player, ...playerData } : player,
                );
            }
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

export const { setGame, addPlayer, removePlayer, clearPlayers, clearGame, editPlayer } =
    gameSlice.actions;

export const selectGame = (state: { game: initialStateProps }) => state.game;
