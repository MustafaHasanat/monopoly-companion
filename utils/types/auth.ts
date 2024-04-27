import { PlayerAvatar, PlayerStatus } from "../enums";

export type Player = {
    id: string;
    created_at: string;
    username: string;
    email: string;
    avatar: PlayerAvatar;
    credit: number;
    status: PlayerStatus;
    game_id: string | null;
};
