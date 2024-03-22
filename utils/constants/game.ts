import { CordsType } from "../types";

export const GAME_CODE = "game_code";

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