export enum UserStatus {
    BANKER = "banker", // currently the bank
    CITIZEN = "citizen", // currently playing
    BROKE = "broke", // lost in the game but the game is not done yet
    AWAITING = "awaiting", // waiting for the banker to let him in
    GHOST = "ghost", // not playing
}
