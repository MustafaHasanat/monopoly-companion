export enum GameTemplateType {
    CLASSIC = "classic",
    MILLIONAIRES = "millionaires",
}

export enum TransactionReason {
    RENT = "rent",
    BUY = "buy",
    CHANCE = "chance",
    TAX = "tax",
    ROUND = "round",
    MORTGAGE = "mortgage",
}

export enum TransactionStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export enum GameEvent {
    JOIN_REQUEST = "join_request",  // sending and receiving a Player type
    CANCEL_JOIN = "cancel_join",  // sending and receiving a Player type
    REQUEST = "request",  // sending and receiving a Transaction type
    SEND = "send",  // sending and receiving a Transaction type
    END_GAME = "end_game",  // the banker ends the game
    LEAVE_GAME = "leave_game",  // a player had left the game
    RESTART_GAME = "restart_game",  // the banker restarts the game
    KICK_OUT = "kick_out",  // the banker licks out a player
    ACCEPT_PLAYER = "accept_player",  // the banker accepts a player's joining request
    REJECT_PLAYER = "reject_player",  // the banker rejects a player's joining request
}
