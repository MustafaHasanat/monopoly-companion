import { GameTemplate } from "../enums";
import { CordsType, GameType } from "../types";

export const INITIAL_GAME_DATA: GameType = {
    id: "",
    created_at: "",
    banker_id: "",
    code: "",
    template: GameTemplate.CLASSIC,
};

export const gameTemplateMapping = () => ({
    CLASSIC: "classic",
    MILLIONAIRE: "millionaire",
});

export const LOBBY_CORDS: {
    start: CordsType;
    join: CordsType;
    create: CordsType;
    waiting: CordsType;
} = {
    create: { x: 0, y: 0 },
    start: { x: 0, y: 1 },
    join: { x: 0, y: 2 },
    waiting: { x: 1, y: 2 },
};

export const CONTROLS_ICONS = [
    { path: "main", isBankerOnly: false },
    { path: "send", isBankerOnly: false },
    { path: "request", isBankerOnly: false },
    { path: "bank", isBankerOnly: true },
    { path: "history", isBankerOnly: false },
    { path: "manage", isBankerOnly: true },
];
