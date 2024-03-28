/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useLocale from "@/hooks/useLocale";
import { normalizeUser } from "@/utils/helpers";
import { authSlice } from "@/utils/redux/auth-slice";
import { selectGame } from "@/utils/redux/game-slice";
import { Grid } from "@mui/material";
import { Session, User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    children: ReactNode;
    user: User | null;
    session: Session | null;
}

const Body = ({ children, user, session }: Props) => {
    const { getLocale } = useLocale();
    const locale = getLocale();
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { game } = useSelector(selectGame);

    useEffect(() => {
        dispatch(authSlice.actions.setUser({ user: normalizeUser(user) }));
        dispatch(authSlice.actions.setSession({ session }));
    }, [user, session]);

    useEffect(() => {
        if (session?.access_token && game.code && !pathname.includes("game")) {
            router.replace("game");
        }
    }, [pathname, session]);

    return (
        <Grid
            container
            component="body"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
            m={0}
            p={{ mobile: "70px 0 0 0", laptop: "70px 0 0 0" }}
            minWidth="100vw"
            minHeight="100vh"
            sx={{
                direction: locale === "en" ? "ltr" : "rtl",
            }}
        >
            {children}
        </Grid>
    );
};

export default Body;
