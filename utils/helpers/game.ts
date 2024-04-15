"use client";

import { updateUser } from "@/app/[locale]/auth/action";
import { GameEvent, UserStatus } from "../enums";
import { BroadcastPayload, GameType, Player } from "../types";
import { endTheGame, getGameByCode } from "@/app/[locale]/game/action";
import { Dispatch, UnknownAction } from "redux";
import { authSlice } from "../redux/auth-slice";
import { gameSlice } from "../redux/game-slice";
import { broadcastHandler, snackbarAlert } from ".";
import supabaseClient from "@/utils/supabase/client";

interface BaseGameProps {
    user: Player;
    game: GameType;
    dispatch: Dispatch<UnknownAction>;
}

// -------- Broadcast Processes ---------

const subscribeToBroadcast = async ({ user, game, dispatch }: BaseGameProps) => {
    const channel = supabaseClient.channel(game.code);

    channel
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
};

const broadcastMessage = async ({ user, game, event }: BaseGameProps & { event: GameEvent }) => {
    const channel = supabaseClient.channel(game.code);

    channel.subscribe((status) => {
        if (status !== "SUBSCRIBED") return null;

        channel.send({
            type: "broadcast",
            event,
            payload: { message: user },
        });
    });
};

const endSubscription = async () => {
    await supabaseClient.removeAllChannels();
};

// -------- Game Processes ---------

export const startTheGameProcess = async ({ user, game, dispatch }: BaseGameProps) => {
    // subscribe to be notified upon responding
    await subscribeToBroadcast({ game, user, dispatch });
    // update the sue data in th DB
    const updatedUser = {
        ...user,
        status: UserStatus.BANKER,
        game_id: game.id,
        credit: 0,
    };
    // change the user status in both DB and global state
    await updateUser({
        data: {
            status: UserStatus.BANKER,
            game_id: game.id,
        },
    });
    dispatch(
        authSlice.actions.setUser({
            user: updatedUser,
        }),
    );
    // set the game object in the global state
    dispatch(
        gameSlice.actions.setGame({
            game,
        }),
    );
    // add the banker to the global players list
    dispatch(gameSlice.actions.addPlayer({ player: updatedUser }));
};

export const joinTheGameProcess = async ({ game, user, dispatch }: BaseGameProps) => {
    // subscribe to the broadcast
    await subscribeToBroadcast({ game, user, dispatch });
    // broadcast a message to the banker
    await broadcastMessage({ user, game, dispatch, event: GameEvent.JOIN_REQUEST });
    // alert the user
    snackbarAlert("Correct game code, join request is sent", "success", dispatch);
    // update user data on the DB
    await updateUser({
        data: {
            status: UserStatus.AWAITING,
            game_id: game.id,
        },
    });
    // update user data on the global state
    dispatch(
        authSlice.actions.updateUser({
            user: {
                status: UserStatus.AWAITING,
                game_id: game.id,
            },
        }),
    );
    // update game data on the global state
    dispatch(
        gameSlice.actions.setGame({
            game,
        }),
    );
};

export const endTheGameProcess = async ({ game, user, dispatch }: BaseGameProps) => {
    // broadcast the termination message
    await broadcastMessage({ user, game, dispatch, event: GameEvent.END_GAME });
    // change the user status in both the DB and the global state
    await updateUser({
        data: {
            status: UserStatus.GHOST,
            game_id: null,
            credit: 0,
        },
    });
    dispatch(
        authSlice.actions.setUser({
            user: {
                ...user,
                status: UserStatus.GHOST,
                game_id: null,
                credit: 0,
            },
        }),
    );
    // set the game object in the global state
    dispatch(gameSlice.actions.clearGame());
    // proceed if there is an ongoing game
    if (game.code) {
        const response = await getGameByCode({ code: game.code });
        // kill the game if the banker logged out
        if (
            response?.data &&
            response?.data.length > 0 &&
            user.id === response?.data[0].banker_id
        ) {
            await endTheGame({ code: game.code });
            dispatch(gameSlice.actions.clearPlayers());
        } else {
            dispatch(gameSlice.actions.removePlayer({ playerId: user.id }));
        }
    }
    // unsubscribe from all channels
    setTimeout(async () => {
        await endSubscription();
    }, 3000);
};

export const cancelJoiningProcess = async ({ game, user, dispatch }: BaseGameProps) => {
    // broadcast the 'cancel_join' event with the user data
    await broadcastMessage({ user, game, dispatch, event: GameEvent.CANCEL_JOIN });
    // alert the user
    snackbarAlert("You have canceled your request to join", "success", dispatch);
    // update user data on the DB
    await updateUser({
        data: {
            status: UserStatus.GHOST,
            game_id: null,
            credit: 0,
        },
    });
    // update user data on the global state
    dispatch(
        authSlice.actions.updateUser({
            user: {
                status: UserStatus.GHOST,
                game_id: null,
                credit: 0,
            },
        }),
    );
    // update game data on the global state
    dispatch(gameSlice.actions.clearGame());
    // unsubscribe from all channels
    setTimeout(async () => {
        await endSubscription();
    }, 3000);
};
