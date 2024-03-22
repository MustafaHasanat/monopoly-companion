import { GameTemplate } from "../enums";

export type GameType = {
    id: string;
    code: string;
    template: GameTemplate;
    banker_id: string;
    created_at: string;
};

export type CordsType = { x: number; y: number };
