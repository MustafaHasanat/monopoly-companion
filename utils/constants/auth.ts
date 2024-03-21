import { UserAvatar, UserStatus } from "../enums";
import { Player } from "../types";

export const INITIAL_PLAYER_DATA: Player = {
    id: "",
    created_at: "",
    username: "",
    email: "",
    avatar: UserAvatar.M1,
    credit: 0,
    status: UserStatus.GHOST,
    game_id: "",
};

export const userAvatarMapping = (isSelect = false) => ({
    M1: isSelect ? "Man 1" : "/images/M1.jpg",
    M2: isSelect ? "Man 2" : "/images/M2.jpg",
    M3: isSelect ? "Man 3" : "/images/M3.jpg",
    M4: isSelect ? "Man 4" : "/images/M4.jpg",
    M5: isSelect ? "Man 5" : "/images/M5.jpg",
    W1: isSelect ? "Woman 1" : "/images/W1.jpg",
    W2: isSelect ? "Woman 2" : "/images/W2.jpg",
    W3: isSelect ? "Woman 3" : "/images/W3.jpg",
    W4: isSelect ? "Woman 4" : "/images/W4.jpg",
    W5: isSelect ? "Woman 5" : "/images/W5.jpg",
    C1: isSelect ? "Child 1" : "/images/C1.jpg",
    C2: isSelect ? "Child 2" : "/images/C2.jpg",
});
