import { User } from "@supabase/supabase-js";
import { Player } from "../types";
import { UserAvatar, UserStatus } from "../enums";
import { INITIAL_PLAYER_DATA } from "../constants";

export const normalizeUser = (user: User | null): Player => {
    if (user && user.user_metadata) {
        return {
            id: user.id,
            created_at: user.created_at,
            email: user.user_metadata?.email as string,
            username: user.user_metadata?.username as string,
            credit: user.user_metadata?.credit as number,
            avatar: user.user_metadata?.avatar as UserAvatar,
            status: user.user_metadata?.status as UserStatus,
            game_id: user.user_metadata?.game_id as string,
        };
    } else {
        return INITIAL_PLAYER_DATA;
    }
};
