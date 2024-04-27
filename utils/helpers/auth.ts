"use client";

import { User } from "@supabase/supabase-js";
import { Player } from "../types";
import { PlayerAvatar, PlayerStatus } from "../enums";
import { INITIAL_PLAYER_DATA } from "../constants";
import { getUserAndSessionData } from "@/app/[locale]/auth/action";

export const normalizeRemotePlayer = (remotePlayer: User | null): Player => {
    if (remotePlayer && remotePlayer.user_metadata) {
        return {
            id: remotePlayer.id,
            created_at: remotePlayer.created_at,
            email: remotePlayer.user_metadata?.email as string,
            username: remotePlayer.user_metadata?.username as string,
            credit: remotePlayer.user_metadata?.credit as number,
            avatar: remotePlayer.user_metadata?.avatar as PlayerAvatar,
            status: remotePlayer.user_metadata?.status as PlayerStatus,
            game_id: remotePlayer.user_metadata?.game_id as string,
        };
    } else {
        return INITIAL_PLAYER_DATA;
    }
};

export const refetchUserData = async () => {
    const { remotePlayer } = await getUserAndSessionData();
    const player = normalizeRemotePlayer(remotePlayer);
    return player;
};
