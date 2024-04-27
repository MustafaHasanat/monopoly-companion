"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { PlayerStatus } from "../enums";
import { BroadcastPayload, GameType, Player } from "../types";
import { addPlayer, clearGame, clearPlayers, removePlayer } from "../redux/game-slice";
import { updateUserById } from "@/app/[locale]/auth/action";
import { getInitialCredit, snackbarAlert } from ".";
import { Dispatch, UnknownAction } from "redux";
import { updatePlayer } from "../redux/auth-slice";

type Props<PayloadType> = BroadcastPayload<PayloadType> & {
    player: Player;
    game: GameType;
    dispatch: Dispatch<UnknownAction>;
};

type MessageType = { message: { player: Player; currentPlayers: Player[] } };

/**
 * This will be fired when a player click the join button
 * in the lobby successfully
 */
const handleJoinEvent = async ({ player, payload, dispatch }: Props<MessageType>) => {
    // banker => add the new player to the current global players and change his status to awaiting
    if (player.status === PlayerStatus.BANKER) {
        dispatch(
            addPlayer({
                player: {
                    ...payload.message.player,
                    status: PlayerStatus.AWAITING,
                },
            }),
        );
        // tell the banker about the request
        snackbarAlert(
            `${payload.message.player.username} has requested to join.`,
            "warning",
            dispatch,
        );
    }
};

/**
 * This will be fired when a player in the waiting room
 * clicks the cancel button
 */
const handleCancelJoinEvent = async ({ player, payload, dispatch }: Props<MessageType>) => {
    // banker => remove the awaiting player from the global players
    // and reset his status, credit, and game_id
    if (player.status === PlayerStatus.BANKER) {
        dispatch(
            removePlayer({
                playerId: payload.message.player.id,
            }),
        );
        await updateUserById({
            id: payload.message.player.id,
            attributes: {
                status: PlayerStatus.GHOST,
                credit: 0,
                game_id: null,
            },
        });
    }
};

/**
 * This will be fired when the banker click the accept button
 * in the manager panel
 */
const handleAcceptPlayerEvent = async ({ player, payload, dispatch, game }: Props<MessageType>) => {
    // initial player's data
    const newPlayerData = {
        ...payload.message.player,
        status: PlayerStatus.CITIZEN,
        credit: getInitialCredit(game.template),
        game_id: game.id,
    };
    // for everyone but the banker => add the new player to the local storage
    if (player.status !== PlayerStatus.BANKER) {
        payload?.message?.currentPlayers &&
            [...payload.message.currentPlayers, newPlayerData].forEach((currentPlayer) => {
                dispatch(
                    addPlayer({
                        player: currentPlayer,
                    }),
                );
            });
    }
    // only for the requestor => update his local data
    if (player.id === payload.message.player.id) {
        dispatch(
            updatePlayer({
                player: newPlayerData,
            }),
        );
    }
    // alarm everyone
    snackbarAlert(
        `${
            player.id === payload.message.player.id
                ? "You have"
                : payload.message.player.username + " has"
        } been added to the game!`,
        "warning",
        dispatch,
    );
};

/**
 * This will be fired when the banker click the reject button
 * in the manager panel
 */
const handleRejectPlayerEvent = async ({ player, payload, dispatch }: Props<MessageType>) => {
    // initial player's data
    const newPlayerData = {
        ...payload.message.player,
        status: PlayerStatus.GHOST,
        credit: 0,
        game_id: null,
    };
    // for everyone but the banker => add the new player to the local storage
    if (player.status !== PlayerStatus.BANKER) {
        dispatch(
            addPlayer({
                player: newPlayerData,
            }),
        );
    }
    // only for the requestor => update his local data
    if (player.id === payload.message.player.id) {
        dispatch(
            updatePlayer({
                player: newPlayerData,
            }),
        );
        // alarm the player
        snackbarAlert("Your request has been rejected!", "warning", dispatch);
    }
};

/**
 * This will be fired when the banker ends the game
 */
const handleEndGameEvent = async ({ dispatch }: Props<MessageType>) => {
    // for everyone:
    //  => empty the players list and game object
    dispatch(clearPlayers());
    dispatch(clearGame());
    //  => reset player data
    dispatch(
        updatePlayer({
            player: {
                status: PlayerStatus.GHOST,
                credit: 0,
                game_id: null,
            },
        }),
    );
};

/**
 * This will be fired when a player leaves the game
 */
const handleLeaveGameEvent = async ({ player, payload, dispatch }: Props<MessageType>) => {
    // for everyone but the requestor:
    //  => remove the player from the list
    if (player.id !== payload.message.player.id) {
        dispatch(
            removePlayer({
                playerId: payload.message.player.id,
            }),
        );
    } else {
        // for the requestor
        //  => empty the players list and game object
        dispatch(clearPlayers());
        dispatch(clearGame());
        //  => reset player data
        dispatch(
            updatePlayer({
                player: {
                    status: PlayerStatus.GHOST,
                    credit: 0,
                    game_id: null,
                },
            }),
        );
    }
};

/**
 * This will be fired when the banker kicks out a player
 */
const handleKickOutEvent = async ({ player, payload, dispatch }: Props<MessageType>) => {
    // for everyone but the banker => remove the kicked player from the local storage
    if (player.status !== PlayerStatus.BANKER) {
        dispatch(
            removePlayer({
                playerId: payload.message.player.id,
            }),
        );
    }
    // only for the requestor => update his local data
    if (player.id === payload.message.player.id) {
        dispatch(
            updatePlayer({
                player: {
                    ...payload.message.player,
                    status: PlayerStatus.GHOST,
                    credit: 0,
                    game_id: null,
                },
            }),
        );
    }
    // alarm everyone else
    snackbarAlert(
        `${
            player.id === payload.message.player.id
                ? "You have"
                : payload.message.player.username + " has"
        } been kicked out from the game!`,
        "warning",
        dispatch,
    );
};

/**
 * This will be fired when the banker restarts the game
 */
const handleRestartGameEvent = async (props: Props<MessageType>) => {};

/**
 * This function will be fired whenever the user got a
 * real-time event from the DB
 */
export const broadcastHandler = async (props: Props<any>) => {
    const eventsMapping: {
        [key: string]: ({ player, payload, dispatch }: Props<MessageType>) => Promise<void>;
    } = {
        join_request: handleJoinEvent,
        cancel_join: handleCancelJoinEvent,
        end_game: handleEndGameEvent,
        leave_game: handleLeaveGameEvent,
        kick_out: handleKickOutEvent,
        accept_player: handleAcceptPlayerEvent,
        reject_player: handleRejectPlayerEvent,
        restart_game: handleRestartGameEvent,
    };

    await eventsMapping[props.event](props);
};
