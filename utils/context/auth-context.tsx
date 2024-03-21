"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { Session } from "@supabase/supabase-js";
import { createContext, useMemo, useState } from "react";
import { Player } from "../types";
import { INITIAL_PLAYER_DATA } from "../constants";

const initialValues: {
    user: Player;
    setUser: (state: Player) => void;
    session: null | Session;
    setSession: (state: Session | null) => void;
} = {
    user: INITIAL_PLAYER_DATA,
    setUser: (state: Player) => {},
    session: null,
    setSession: (state: Session | null) => {},
};

export const AuthContext = createContext(initialValues);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Player>(INITIAL_PLAYER_DATA);
    const [session, setSession] = useState<null | Session>(null);

    const provider = useMemo(
        () => ({
            user,
            setUser: (state: Player) => {
                setUser(state);
            },
            session,
            setSession: (state: Session | null) => {
                setSession(state);
            },
        }),
        [user, session]
    );

    return (
        <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
    );
}
