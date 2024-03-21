import { UserAvatar, UserStatus } from "../enums";

export type Player = {
    id: string;
    created_at: string;
    username: string;
    email: string;
    avatar: UserAvatar;
    credit: number;
    status: UserStatus;
    game_id: string | null;
};
