"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { GameEvent, UserStatus } from "../enums";
import { BroadcastPayload, Player } from "../types";
import { gameSlice } from "../redux/game-slice";
import { updateUserById } from "@/app/[locale]/auth/action";
import { snackbarAlert } from ".";
import { Dispatch, UnknownAction } from "redux";

type Props<PayloadType> = BroadcastPayload<PayloadType> & {
    user: Player;
    dispatch: Dispatch<UnknownAction>;
};

/**
 * This will be fired when a player click the join button
 * in the lobby successfully
 */
const handleJoinEvent = async (props: Props<{ message: Player }>) => {
    // banker => add the new player to the current global players and change his status to awaiting
    if (props.user.status === UserStatus.BANKER) {
        props.dispatch(
            gameSlice.actions.addPlayer({
                player: {
                    ...props.payload.message,
                    status: UserStatus.AWAITING,
                },
            }),
        );
        // tell the banker about the request
        snackbarAlert(
            `${props.payload.message.username} has requested to join.`,
            "warning",
            props.dispatch,
        );
    }
};

/**
 * This will be fired when a player in the waiting room
 * clicks the cancel button
 */
const handleCancelJoinEvent = async (props: Props<{ message: Player }>) => {
    // banker => remove the awaiting player from the global players
    // and rest his status, credit, and game_id
    if (props.user.status === UserStatus.BANKER) {
        props.dispatch(
            gameSlice.actions.removePlayer({
                playerId: props.payload.message.id,
            }),
        );
        await updateUserById(props.payload.message.id, {
            data: {
                status: UserStatus.GHOST,
                credit: 0,
                game_id: null,
            },
        });
    }
};

/**
 * This will be fired when the banker accepts or rejects the joining request
 */
const handleJoinResponseEvent = async (props: Props<any>) => {};

/**
 * This will be fired when the banker ends the game
 */
const handleEndGameEvent = async (props: Props<{ message: Player }>) => {};

/**
 * This will be fired when the banker kicks out a player
 */
const handleKickOutEvent = async (props: Props<{ message: Player }>) => {};

/**
 * This will be fired when the banker restarts the game
 */
const handleRestartGameEvent = async (props: Props<{ message: Player }>) => {};

/**
 * This function will be fired whenever the user got a
 * real-time event from the DB
 */
export const broadcastHandler = async (props: Props<any>) => {
    // if someone requested to join
    if (props.event === GameEvent.JOIN_REQUEST) {
        await handleJoinEvent(props);
        return;
    }
    // if someone in the awaiting room canceled his request to join
    if (props.event === GameEvent.CANCEL_JOIN) {
        await handleCancelJoinEvent(props);
        return;
    }
    // if the banker ends the game
    if (props.event === GameEvent.END_GAME) {
        await handleEndGameEvent(props);
        return;
    }
    // when the banker responses to the join request
    if (props.event === GameEvent.JOIN_RESPONSE) {
        await handleJoinResponseEvent(props);
        return;
    }
    // when the banker kicks out a player
    if (props.event === GameEvent.KICK_OUT) {
        await handleKickOutEvent(props);
        return;
    }
    // when the banker restarts the game
    if (props.event === GameEvent.RESTART_GAME) {
        await handleRestartGameEvent(props);
        return;
    }
};
