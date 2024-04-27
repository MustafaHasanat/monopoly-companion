"use client";

import { GameEvent } from "../enums";
import { BroadcastPayload, GameType, Player } from "../types";
import { Dispatch, UnknownAction } from "redux";
import { broadcastHandler } from ".";
import supabaseClient from "@/utils/supabase/client";

export interface BaseGameProps {
    player: Player;
    game: GameType;
    dispatch: Dispatch<UnknownAction>;
}

export const subscribeToBroadcast = async ({ player, game, dispatch }: BaseGameProps) => {
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
                    player,
                    game,
                    event: payload.event as GameEvent,
                    payload: payload.payload,
                    type: payload.type,
                });
            },
        )
        .subscribe();
};

export const broadcastMessage = async ({
    player,
    game,
    event,
    currentPlayers,
}: BaseGameProps & { event: GameEvent; currentPlayers?: Player[] }) => {
    const channel = supabaseClient.channel(game.code);

    channel.subscribe((status) => {
        if (status !== "SUBSCRIBED") return null;

        channel.send({
            type: "broadcast",
            event,
            payload: { message: { player, currentPlayers: currentPlayers || [] } },
        });
    });
};

export const endSubscription = async () => {
    await supabaseClient.removeAllChannels();
};
