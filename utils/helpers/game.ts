import { updateUser } from "@/app/[locale]/auth/action";
import { UserStatus } from "../enums";
import { GameType, Player } from "../types";
import {
    endSubscription,
    endTheGame,
    getGameByCode,
} from "@/app/[locale]/game/action";
import { Dispatch, UnknownAction } from "redux";
import { authSlice } from "../redux/auth-slice";
import { gameSlice } from "../redux/game-slice";
import { joinGame } from "@/app/[locale]/lobby/action";

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
    await updateUser({ status: UserStatus.BANKER, game_id: game.id });
    dispatch(
        authSlice.actions.setUser({
            user: {
                ...user,
                status: UserStatus.BANKER,
                game_id: game.id,
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

export const joinTheGameProcess = async ({
    game,
    dispatch,
}: Omit<BaseGameProps, "user">) => {
    await joinGame({ code: game.code });
    // update user data on the DB
    await updateUser({ status: UserStatus.AWAITING, game_id: game.id });
    // update user data on the global state
    dispatch(
        authSlice.actions.updateUser({
            user: {
                status: UserStatus.AWAITING,
                game_id: game.id,
            },
        })
    );
    // update game data on the global state
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
    await updateUser({
        status: UserStatus.GHOST,
        game_id: null,
    });
    dispatch(
        authSlice.actions.setUser({
            user: {
                ...user,
                status: UserStatus.GHOST,
                game_id: null,
            },
        })
    );
    // set the game object in the global state
    dispatch(gameSlice.actions.clearGame());
    // unsubscribe from all channels 
    await endSubscription();
    // proceed if there is an ongoing game
    if (game.code) {
        const response = await getGameByCode({ code: game.code });
        // kill the game if the banker logged out
        if (
            response?.data &&
            response?.data.length > 0 &&
            user.id === response?.data[0].banker_id
        ) {
            await endTheGame({ code: game.code });
        }
    }
};
