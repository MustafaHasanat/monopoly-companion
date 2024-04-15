"use client";

import { Divider, Grid, Typography } from "@mui/material";
import Main from "../layout/main";
import { BroadcastPayload, GamePage } from "@/utils/types";
import { useEffect, useState } from "react";
import MainWindow from "./mainWindow";
import HistoryWindow from "./historyWindow";
import ManageWindow from "./manageWindow";
import RequestWindow from "./requestWindow";
import BankWindow from "./bankWindow";
import SendWindow from "./sendWindow";
import useLocale from "@/hooks/useLocale";
import ControlsPanel from "./controlsPanel";
import useAuthGuard from "@/hooks/useAuthGuard";
import { useDispatch, useSelector } from "react-redux";
import { selectGame } from "@/utils/redux/game-slice";
import { selectAuth } from "@/utils/redux/auth-slice";
import { GameEvent } from "@/utils/enums";
import supabaseClient from "@/utils/supabase/client";
import { broadcastHandler } from "@/utils/helpers";

interface Props {
    page: GamePage;
}

const WindowController = ({ page }: Props) => {
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useState(page);
    const { getDictLocales } = useLocale();
    const { game } = getDictLocales();
    const { game: gameObj } = useSelector(selectGame);
    const { user } = useSelector(selectAuth);
    const { isAccessible, loadingComponent } = useAuthGuard({
        page: "game",
    });

    useEffect(() => {
        setActivePage(page);
    }, [page]);

    useEffect(() => {
        // Subscribe to real-time changes
        const subscription = supabaseClient
            .channel(gameObj.code)
            .on(
                "broadcast",
                { event: "*" },
                async (
                    payload: Omit<BroadcastPayload<{ message: any }>, "event"> & {
                        event: string;
                    },
                ) => {
                    await broadcastHandler({
                        dispatch,
                        user,
                        event: payload.event as GameEvent,
                        payload: payload.payload,
                        type: payload.type,
                    });
                },
            )
            .subscribe();

        // Clean up subscription on component unmount
        return () => {
            subscription.unsubscribe();
        };
    }, [dispatch, gameObj, user]);

    const pagesMapping = {
        main: { component: <MainWindow />, title: game.main.title },
        send: { component: <SendWindow />, title: game.send.title },
        request: { component: <RequestWindow />, title: game.request.title },
        bank: { component: <BankWindow />, title: game.bankRequests.title },
        history: { component: <HistoryWindow />, title: game.history.title },
        manage: { component: <ManageWindow />, title: game.manage.title },
    };

    return !isAccessible ? (
        loadingComponent
    ) : (
        <Main
            sx={{
                px: {
                    mobile: "20px",
                    tablet: "15%",
                    laptop: "25%",
                },
                pb: {
                    mobile: "30px",
                    tablet: "30px",
                    laptop: "50px",
                },
                gap: 3,
            }}
        >
            <ControlsPanel />

            <Grid container item justifyContent="center">
                <Typography variant="h4">{pagesMapping[activePage].title}</Typography>
            </Grid>

            <Grid container item justifyContent="center">
                <Divider
                    sx={{
                        width: "100%",
                    }}
                />
            </Grid>

            {pagesMapping[activePage].component}
        </Main>
    );
};

export default WindowController;
