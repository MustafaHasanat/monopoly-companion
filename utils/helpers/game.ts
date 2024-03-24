import { changeUserStatus } from "@/app/[locale]/auth/action";
import { GAME_CODE, INITIAL_GAME_DATA } from "../constants";
import { UserStatus } from "../enums";
import { GameType, Player } from "../types";
import { endTheGame, getGameByCode } from "@/app/[locale]/game/action";
import { Dispatch, UnknownAction } from "redux";
import { authSlice, selectAuth } from "../redux/auth-slice";
import { gameSlice } from "../redux/game-slice";

interface BaseGameProps {
    code: string;
    user: Player;
    game: GameType;
    dispatch: Dispatch<UnknownAction>;
}

export const startTheGameProcess = async ({
    code,
    user,
    game,
    dispatch,
}: BaseGameProps) => {
    // change the user status in both DB and global state
    await changeUserStatus({ status: UserStatus.BANKER });
    dispatch(
        authSlice.actions.setUser({
            user: {
                ...user,
                status: UserStatus.BANKER,
            },
        })
    );
    // set the game object in the global state
    dispatch(
        gameSlice.actions.setGame({
            game,
        })
    );
    // set the game code in teh device
    window.localStorage.setItem(GAME_CODE, code);
};

export const endTheGameProcess = async ({
    code,
    user,
    dispatch,
}: BaseGameProps) => {
    // change the user status in both the DB and the global state
    await changeUserStatus({
        status: UserStatus.GHOST,
    });
    dispatch(
        authSlice.actions.setUser({
            user: {
                ...user,
                status: UserStatus.GHOST,
            },
        })
    );
    // set the game object in the global state
    dispatch(
        gameSlice.actions.setGame({
            game: INITIAL_GAME_DATA,
        })
    );
    // kill the game if the banker logged out
    const response = await getGameByCode({ code });
    if (
        response?.data &&
        response?.data.length > 0 &&
        user.id === response?.data[0].banker_id
    ) {
        await endTheGame({ code });
    }
    // delete the game code form the device
    window.localStorage.removeItem(GAME_CODE);
};
