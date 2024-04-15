import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { authSlice } from "./auth-slice";
import { controlsSlice } from "./controls-slice";
import { gameSlice } from "./game-slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window === "undefined"
        ? createNoopStorage()
        : createWebStorage("local");

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "session"],
};

const controlsPersistConfig = {
    key: "controls",
    storage,
    whitelist: ["colorMode", "modalContent", "snackbarState"],
};

const gamePersistConfig = {
    key: "game",
    storage,
    whitelist: ["game", "players"],
};

const authPersistReducer = persistReducer(authPersistConfig, authSlice.reducer);
const gamePersistReducer = persistReducer(gamePersistConfig, gameSlice.reducer);
const controlsPersistReducer = persistReducer(
    controlsPersistConfig,
    controlsSlice.reducer
);

const reducers = combineReducers({
    auth: authPersistReducer,
    controls: controlsPersistReducer,
    game: gamePersistReducer,
});

export default reducers;
