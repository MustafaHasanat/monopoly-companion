import { createSlice } from "@reduxjs/toolkit";
import { Player, StorePayload } from "../types";
import { Session } from "@supabase/supabase-js";
import { INITIAL_PLAYER_DATA } from "../constants";

interface initialStateProps {
    player: Player;
    session: null | Session;
}

const initialState: initialStateProps = {
    player: INITIAL_PLAYER_DATA,
    session: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setPlayer: (
            state: { player: Player },
            { payload: { player } }: StorePayload<{ player: Player }>,
        ) => {
            state.player = player;
        },
        updatePlayer: (
            state: { player: Player },
            { payload: { player } }: StorePayload<{ player: Partial<Player> }>,
        ) => {
            state.player = {
                ...state.player,
                ...player,
            };
        },
        setSession: (
            state: { session: null | Session },
            { payload: { session } }: StorePayload<{ session: null | Session }>,
        ) => {
            state.session = session;
        },
    },
});

export const { setPlayer, setSession, updatePlayer } = authSlice.actions;

export const selectAuth = (state: { auth: initialStateProps }) => state.auth;
