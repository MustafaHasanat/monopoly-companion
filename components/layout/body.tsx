/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useLocale from "@/hooks/useLocale";
import { PlayerStatus } from "@/utils/enums";
import { normalizeRemotePlayer } from "@/utils/helpers";
import { refetchUserData } from "@/utils/helpers/auth";
import { selectAuth, setSession, setPlayer } from "@/utils/redux/auth-slice";
import { selectGame } from "@/utils/redux/game-slice";
import { Grid } from "@mui/material";
import { Session, User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    children: ReactNode;
    remotePlayer: User | null;
    session: Session | null;
}

const Body = ({ children, remotePlayer, session }: Props) => {
    const { getLocale } = useLocale();
    const locale = getLocale();
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { game } = useSelector(selectGame);
    const { player } = useSelector(selectAuth);

    useEffect(() => {
        const player = normalizeRemotePlayer(remotePlayer);
        dispatch(setPlayer({ player }));
        dispatch(setSession({ session }));
    }, [remotePlayer, session]);

    useEffect(() => {
        const getData = async () => {
            const upToDatePlayer = await refetchUserData();
            dispatch(setPlayer({ player: upToDatePlayer }));
        };
        getData();
    }, [player.status, player.credit, player.game_id]);

    useEffect(() => {
        if (
            session?.access_token &&
            game.code &&
            player.game_id &&
            [PlayerStatus.BANKER, PlayerStatus.CITIZEN].includes(player.status) &&
            !pathname.includes("game")
        ) {
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
