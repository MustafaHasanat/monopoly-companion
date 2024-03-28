import { GameTemplate, TransactionStatus } from "../enums";
import { TransactionReason } from "../enums";

export type GameType = {
    id: string;
    code: string;
    template: GameTemplate;
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
