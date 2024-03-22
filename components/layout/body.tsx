/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useLocale from "@/hooks/useLocale";
import { GAME_CODE } from "@/utils/constants";
import { AuthContext } from "@/utils/context/auth-context";
import { normalizeUser } from "@/utils/helpers/auth";
import { Box } from "@mui/material";
import { Session, User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";

interface Props {
    children: ReactNode;
    user: User | null;
    session: Session | null;
}

const Body = ({ children, user, session }: Props) => {
    const { getLocale } = useLocale();
    const locale = getLocale();
    const { setUser, setSession } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setUser(normalizeUser(user));
        setSession(session);
    }, [user, session]);

    useEffect(() => {
        const code = window.localStorage.getItem(GAME_CODE);

        if (session?.access_token && code) {
            router.replace("game");
        }
    }, [pathname, session]);

    return (
        <Box
            component="body"
            sx={{
                direction: locale === "en" ? "ltr" : "rtl",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                minWidth: "100vw",
                minHeight: "100vh",
                p: { mobile: "70px 0 0 0", laptop: "70px 0 0 0" },
                m: 0,
            }}
        >
            {children}
        </Box>
    );
};

export default Body;
