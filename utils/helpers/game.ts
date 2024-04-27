"use client";

import { updateUser, updateUserById } from "@/app/[locale]/auth/action";
import { GameEvent, GameTemplateType, PlayerStatus } from "../enums";
import { endTheGame, getGameByCode } from "@/app/[locale]/game/action";
import {
    BaseGameProps,
    broadcastMessage,
    endSubscription,
    snackbarAlert,
    subscribeToBroadcast,
} from ".";
import { updatePlayer } from "../redux/auth-slice";
import {
    addPlayer,
    clearGame,
    clearPlayers,
    editPlayer,
    removePlayer,
    setGame,
} from "../redux/game-slice";
import { CLASSIC_GAME, MILLIONAIRES_GAME } from "../constants";
import { Player } from "../types";

export const getInitialCredit = (gameTemplate: GameTemplateType) => {
    return gameTemplate === GameTemplateType.CLASSIC
        ? CLASSIC_GAME.initialCredit
        : MILLIONAIRES_GAME.initialCredit;
};

export const startTheGameProcess = async ({ player, game, dispatch }: BaseGameProps) => {
    // subscribe to be notified upon responding
    await subscribeToBroadcast({ game, player, dispatch });
    // update the player data in th DB
    const updatedPlayer = {
        ...player,
        status: PlayerStatus.BANKER,
        game_id: game.id,
        credit: getInitialCredit(game.template),
    };
    // change the user status in both DB and global state
    await updateUser({
        data: updatedPlayer,
    });
    dispatch(
        updatePlayer({
            player: updatedPlayer,
        }),
    );
    // set the game object in the global state
    dispatch(
        setGame({
            game,
        }),
    );
    // add the banker to the global players list
    dispatch(addPlayer({ player: updatedPlayer }));
};

export const joinTheGameProcess = async ({ game, player, dispatch }: BaseGameProps) => {
    // subscribe to the broadcast
    await subscribeToBroadcast({ game, player, dispatch });
    // broadcast a message to the banker
    await broadcastMessage({ player, game, dispatch, event: GameEvent.JOIN_REQUEST });
    // alert the user
    snackbarAlert("Join request is sent", "success", dispatch);
    // update user data on the DB
    await updateUser({
        data: {
            status: PlayerStatus.AWAITING,
            game_id: game.id,
        },
    });
    // update user data on the global state
    dispatch(
        updatePlayer({
            player: {
                status: PlayerStatus.AWAITING,
                game_id: game.id,
            },
        }),
    );
    // update game data on the global state
    dispatch(
        setGame({
            game,
        }),
    );
};

export const cancelJoiningProcess = async ({ game, player, dispatch }: BaseGameProps) => {
    // broadcast the 'cancel_join' event with the user data
    await broadcastMessage({ player, game, dispatch, event: GameEvent.CANCEL_JOIN });
    // alert the user
    snackbarAlert("You have canceled your request to join", "success", dispatch);
    // update user data on the DB
    await updateUser({
        data: {
            status: PlayerStatus.GHOST,
            game_id: null,
            credit: 0,
        },
    });
    // update user data on the global state
    dispatch(
        updatePlayer({
            player: {
                status: PlayerStatus.GHOST,
                game_id: null,
                credit: 0,
            },
        }),
    );
    // update game data on the global state
    dispatch(clearGame());
    // unsubscribe from all channels
    setTimeout(async () => {
        await endSubscription();
    }, 3000);
};

export const acceptPlayerProcess = async ({
    game,
    player, // the banker sends the new player's data
    dispatch,
    currentPlayers,
}: BaseGameProps & { currentPlayers: Player[] }) => {
    // broadcast the 'accept_player' event with the user data
    await broadcastMessage({
        player,
        currentPlayers,
        game,
        dispatch,
        event: GameEvent.ACCEPT_PLAYER,
    });
    // initial player's data
    const newPlayerData = {
        status: PlayerStatus.CITIZEN,
        credit: getInitialCredit(game.template),
        game_id: game.id,
    };
    // update new player data on the DB
    await updateUserById({
        id: player.id,
        attributes: newPlayerData,
    });
    // update the player's data in the local storage for the banker
    dispatch(
        editPlayer({
            playerId: player.id,
            playerData: { ...player, ...newPlayerData },
        }),
    );
};

export const rejectPlayerProcess = async ({ game, player, dispatch }: BaseGameProps) => {
    // broadcast the 'reject_player' event with the user data
    await broadcastMessage({ player, game, dispatch, event: GameEvent.REJECT_PLAYER });
    // update new player data on the DB
    await updateUserById({
        id: player.id,
        attributes: {
            status: PlayerStatus.GHOST,
            credit: 0,
            game_id: null,
        },
    });
    // remove the player in the local storage for the banker
    dispatch(
        removePlayer({
            playerId: player.id,
        }),
    );
};

export const kickPlayerProcess = async ({
    game,
    player, // the banker sends the new player's data
    dispatch,
}: BaseGameProps) => {
    // broadcast the 'accept_player' event with the user data
    await broadcastMessage({ player, game, dispatch, event: GameEvent.KICK_OUT });
    // update player's data on the DB
    await updateUserById({
        id: player.id,
        attributes: {
            status: PlayerStatus.GHOST,
            credit: 0,
            game_id: null,
        },
    });
    // remove the player in the local storage for the banker
    dispatch(
        removePlayer({
            playerId: player.id,
        }),
    );
};

export const endTheGameProcess = async ({
    game,
    player,
    dispatch,
    currentPlayers,
}: BaseGameProps & { currentPlayers: Player[] }) => {
    // get the current game data
    const currentGame = await getGameByCode({ code: game.code });
    // kill the game if the banker logged out
    if (
        currentGame?.data &&
        currentGame?.data.length > 0 &&
        player.id === currentGame?.data[0].banker_id
    ) {
        // broadcast the termination message
        await broadcastMessage({
            player,
            game,
            dispatch,
            event: GameEvent.END_GAME,
        });
        // end the game
        await endTheGame({ code: game.code });
        // change the players data on DB
        await Promise.all(
            currentPlayers.map(async (currentPlayer) => {
                await updateUserById({
                    id: currentPlayer.id,
                    attributes: {
                        status: PlayerStatus.GHOST,
                        credit: 0,
                        game_id: null,
                    },
                });
            }),
        );
    } else {
        // broadcast the leave message
        await broadcastMessage({
            player,
            game,
            dispatch,
            event: GameEvent.LEAVE_GAME,
        });
    }
    // player data
    const playerData = {
        status: PlayerStatus.GHOST,
        game_id: null,
        credit: 0,
    };
    // change the user status in both the DB and the global state
    await updateUser({
        data: playerData,
    });
    dispatch(
        updatePlayer({
            player: {
                ...player,
                ...playerData,
            },
        }),
    );
    // clear the players list and the game
    dispatch(clearPlayers());
    dispatch(clearGame());
    // unsubscribe from all channels
    setTimeout(async () => {
        await endSubscription();
    }, 3000);
};
