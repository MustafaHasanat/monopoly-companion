import { GameEvent, GameTemplateType, TransactionStatus } from "../enums";
import { TransactionReason } from "../enums";

export type GameType = {
    id: string;
    code: string;
    template: GameTemplateType;
    banker_id: string;
    created_at: string;
};

export type CordsType = { x: number; y: number };

export type TransactionType = {
    id: string;
    reason: TransactionReason;
    amount: number;
    is_request: boolean; // true: this is a request to the banker, false: this is a transaction between players
    status: TransactionStatus; // make it in_active once its done if it's a request, and immediately if it was between players
    sender_id: string;
    recipient_id: string;
    game_id: string;
    created_at: string;
};

export type BroadcastPayload<PayloadType> = {
    event: GameEvent;
    payload: PayloadType;
    type: "broadcast";
};

export type ResponseEventType = {
    response: "accepted" | "rejected";
};

export type BankerActionEventType = {
    kick: {
        playerId: string;
        isAll: boolean; // if true, end the game by kicking everyone
    } | null;
    setCredit: {
        playerId: string;
        credit: number;
        isAll: boolean; // if true, reset the game by setting everyone's credit to the default
    } | null;
    transfer: {
        playerId: string;
    } | null;
};

export type GameTemplate = {
    type: GameTemplateType;
    initialCredit: number;
    roundCredit: number;
};
