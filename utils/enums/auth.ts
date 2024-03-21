export enum UserStatus {
    BANKER = "banker", // currently the bank
    CITIZEN = "citizen", // currently playing
    BROKE = "broke", // lost in the game but the game is not done yet
    AWAITING = "awaiting", // waiting for the banker to let him in
    GHOST = "ghost", // not playing
}

export enum UserAvatar {
    M1 = "M1",
    M2 = "M2",
    M3 = "M3",
    M4 = "M4",
    M5 = "M5",
    W1 = "W1",
    W2 = "W2",
    W3 = "W3",
    W4 = "W4",
    W5 = "W5",
    C1 = "C1",
    C2 = "C2",
}
