import { createSlice } from "@reduxjs/toolkit";
import { Player, StorePayload } from "../types";
import { Session } from "@supabase/supabase-js";
import { INITIAL_PLAYER_DATA } from "../constants";

interface initialStateProps {
    user: Player;
    session: null | Session;
}

const initialState: initialStateProps = {
    user: INITIAL_PLAYER_DATA,
    session: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state: { user: Player },
            { payload: { user } }: StorePayload<{ user: Player }>
        ) => {
            state.user = user;
        },
        setSession: (
            state: { session: null | Session },
            { payload: { session } }: StorePayload<{ session: null | Session }>
        ) => {
            state.session = session;
        },
    },
});

export const { setUser, setSession } = authSlice.actions;

export const selectAuth = (state: { auth: initialStateProps }) => state.auth;
