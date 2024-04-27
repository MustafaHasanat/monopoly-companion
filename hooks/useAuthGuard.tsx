"use client";

import useLocale from "./useLocale";
import { useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingPage from "@/components/shared/loading";
import { selectGame } from "@/utils/redux/game-slice";
import { PlayerStatus } from "@/utils/enums";

interface Props {
    page: "account" | "lobby" | "game" | "auth";
}
interface ReturnProps {
    isAccessible: boolean;
    loadingComponent: ReactNode;
}

const useAuthGuard = ({ page }: Props): ReturnProps => {
    const { getDictLocales } = useLocale();
    const { global } = getDictLocales();
    const { session, player } = useSelector(selectAuth);
    const { game } = useSelector(selectGame);
    const router = useRouter();
    const pathname = usePathname();

    const isSpecialPath = page === "auth";

    const [isAccessible, setIsAccessible] = useState(isSpecialPath);
    // is the path only accessible by logged in users?
    const isPrivatePath = ["lobby", "game", "account"].includes(page);
    // is the path only accessible by currently playing users?
    const isGamersPath = page === "game";
    // is the path only accessible by currently playing users?
    const isLobbyPath = page === "lobby";
    // is user currently playing a game?
    const isGamer =
        !!game.code &&
        game.id === player.game_id &&
        [PlayerStatus.BANKER, PlayerStatus.CITIZEN].includes(player.status);
    // is the user in the waiting room
    const isAwaiting =
        !!game.code && game.id === player.game_id && player.status === PlayerStatus.AWAITING;

    // check the the user data and user current path to decide what to do with them
    useEffect(() => {
        const isLoggedIn = !!session?.access_token;
        // if not logged in and the page is private, redirect to the auth page
        if (!isLoggedIn && isPrivatePath) {
            setIsAccessible(false);
            setTimeout(() => {
                router.replace("/auth?active=login");
            }, 1000);
            return;
        }
        // if logged in and not a gamer but try to open the game path, redirect to the lobby page
        if (isLoggedIn && !isGamer && isGamersPath) {
            setIsAccessible(false);
            setTimeout(() => {
                router.replace("/lobby?active=start");
            }, 1000);
            return;
        }
        // if logged in and a gamer but try to leave the game path manually, return them to the game page
        if (isLoggedIn && isGamer && !isGamersPath) {
            setIsAccessible(false);
            setTimeout(() => {
                router.replace("/game");
            }, 1000);
            return;
        }
        // if logged in and was awaiting for a game but try to leave the awaiting path, return them the awaiting lobby page
        if (isLoggedIn && isAwaiting && !isLobbyPath) {
            setIsAccessible(false);
            setTimeout(() => {
                router.replace("/lobby?active=awaiting");
            }, 1000);
            return;
        }
        setIsAccessible(true);
    }, [
        isGamersPath,
        isPrivatePath,
        pathname,
        router,
        session?.access_token,
        isGamer,
        isLobbyPath,
        isAwaiting,
    ]);

    return {
        isAccessible,
        loadingComponent: <LoadingPage phrase={global.redirecting} />,
    };
};

export default useAuthGuard;
