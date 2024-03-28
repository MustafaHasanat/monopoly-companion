/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendSchema } from "@/utils/schemas";
import { TransactionReason } from "@/utils/enums";
import { Grid } from "@mui/material";
import { SelectBox, TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { Player } from "@/utils/types";
import { ContainedButton } from "../shared/button";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";
import { sendCredit } from "@/app/[locale]/game/action";
import { controlsSlice } from "@/utils/redux/controls-slice";
import { useEffect, useState } from "react";
import { selectGame } from "@/utils/redux/game-slice";

export type PartialPlayer = Omit<
    Player,
    "created_at" | "avatar" | "credit" | "status" | "game_id"
>;

const SendWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard({ page: "game" });
    const { getDictLocales } = useLocale();
    const { game } = getDictLocales();
    const { user } = useSelector(selectAuth);
    const { game: gameObj } = useSelector(selectGame);
    const dispatch = useDispatch();

    const getRecipientById = (id: string) =>
        currentRecipients.filter((recipient) => recipient.id === id);

    const currentRecipients: PartialPlayer[] = [
        {
            id: "bank",
            username: "bank",
            email: "bank@bank.com",
        },
        {
            id: "XXXX",
            username: "Jack 1",
            email: "jack1@email.com",
        },
        {
            id: "YYYY",
            username: "Jack 2",
            email: "jack2@email.com",
        },
    ];

    const {
        recipientsIds,
        recipientsNames,
    }: { recipientsIds: string[]; recipientsNames: string[] } =
        currentRecipients.reduce(
            (
                acc: {
                    recipientsIds: string[];
                    recipientsNames: string[];
                },
                current: PartialPlayer
            ) => ({
                recipientsIds: [...acc.recipientsIds, current.id],
                recipientsNames: [...acc.recipientsNames, current.username],
            }),
            {
                recipientsIds: [],
                recipientsNames: [],
            }
        );

    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        resolver: yupResolver(sendSchema(recipientsIds)),
        defaultValues: {
            amount: 200,
            reason: TransactionReason.TAX,
            recipient: recipientsIds[0],
        },
    });

    const [recipient, setRecipient] = useState(currentRecipients[0]);
    useEffect(() => {
        setRecipient(getRecipientById(watch("recipient"))[0]);
    }, [watch]);

    const onSubmit = async (formData: {
        recipient: string;
        reason: string;
        amount: number;
    }) => {
        console.log(formData);

        await sendCredit({
            game: gameObj,
            transaction: {
                amount: watch("amount"),
                reason: watch("reason"),
                recipient_id: watch("recipient"),
                sender_id: user.id,
            },
        })
            .then((data) => {
                dispatch(
                    controlsSlice.actions.setSnackbarState({
                        snackbarState: {
                            message: `${formData.amount}$ was sent to ${recipient.username}`,
                            severity: "success",
                        },
                    })
                );
            })
            .catch((error) => {
                dispatch(
                    controlsSlice.actions.setSnackbarState({
                        snackbarState: {
                            message: "Error occurred",
                            severity: "error",
                        },
                    })
                );
            });
    };

    return !isAccessible ? (
        loadingComponent
    ) : (
        <Grid
            container
            justifyContent="center"
            alignContent="center"
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            mobile={12}
            gap={5}
            sx={{
                width: "100%",
                height: "100%",
            }}
        >
            <Grid item mobile={12}>
                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            type="number"
                            defaultValue={200}
                            value={watch("amount")}
                            label={game.amount}
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                            sx={{
                                width: "100%",
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12} m="auto">
                <Controller
                    name="recipient"
                    control={control}
                    render={({ field }) => (
                        <SelectBox
                            {...field}
                            initialValue={recipientsIds[0]}
                            defaultValue={recipientsIds[0]}
                            label={game.recipient}
                            values={recipientsIds}
                            labels={recipientsNames}
                            error={!!errors.recipient}
                            helperText={errors.recipient?.message}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12} m="auto">
                <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                        <SelectBox
                            {...field}
                            initialValue={TransactionReason.TAX}
                            defaultValue={TransactionReason.TAX}
                            label={game.reason}
                            values={Object.values(TransactionReason)}
                            labels={Object.values(TransactionReason)}
                            error={!!errors.reason}
                            helperText={errors.reason?.message}
                        />
                    )}
                />
            </Grid>

            <Grid container item mobile={12} justifyContent="center">
                <ContainedButton
                    type="submit"
                    sx={{
                        width: { mobile: "80%", laptop: "50%" },
                        m: "auto",
                    }}
                >
                    {game.send.submit}
                </ContainedButton>
            </Grid>
        </Grid>
    );
};

export default SendWindow;
