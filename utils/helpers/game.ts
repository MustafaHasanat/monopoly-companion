import { changeUserStatus } from "@/app/[locale]/auth/action";
import { UserStatus } from "../enums";
import { GameType, Player } from "../types";
import { endTheGame, getGameByCode } from "@/app/[locale]/game/action";
import { Dispatch, UnknownAction } from "redux";
import { authSlice } from "../redux/auth-slice";
import { gameSlice } from "../redux/game-slice";

interface BaseGameProps {
    user: Player;
    game: GameType;
    dispatch: Dispatch<UnknownAction>;
}

export const startTheGameProcess = async ({
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
};

export const endTheGameProcess = async ({
    game,
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
    dispatch(gameSlice.actions.clearGame());
    // kill the game if the banker logged out
    const response = await getGameByCode({ code: game.code });
    if (
        response?.data &&
        response?.data.length > 0 &&
        user.id === response?.data[0].banker_id
    ) {
        await endTheGame({ code: game.code });
    }
};
