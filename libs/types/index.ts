import { UserStatus } from "../enums";

export type ModalContentType = "none" | "form";

export type User = {
    id: string;
    created_at: string;
    username: string;
    email: string;
    password: string;
    avatar: string | null;
    credit: 0;
    status: UserStatus;
    game_id: string | null;
};
