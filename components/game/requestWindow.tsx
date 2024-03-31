"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { requestSchema } from "@/utils/schemas";
import { TransactionReason } from "@/utils/enums";
import { Grid } from "@mui/material";
import { SelectBox, TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { ContainedButton } from "../shared/button";
import { useDispatch, useSelector } from "react-redux";
import { controlsSlice } from "@/utils/redux/controls-slice";
import { requestCredit } from "@/app/[locale]/game/action";
import { selectAuth } from "@/utils/redux/auth-slice";
import { selectGame } from "@/utils/redux/game-slice";

const RequestWindow = () => {
    const { getDictLocales } = useLocale();
    const { user } = useSelector(selectAuth);
    const { game: gameObj } = useSelector(selectGame);
    const dispatch = useDispatch();
    const { game } = getDictLocales();

    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        resolver: yupResolver(requestSchema),
        defaultValues: {
            amount: 200,
            reason: TransactionReason.TAX,
        },
    });

    const onSubmit = async (formData: { reason: string; amount: number }) => {
        console.log(formData);

        await requestCredit({})
            .then((data) => {
                dispatch(
                    controlsSlice.actions.setSnackbarState({
                        snackbarState: {
                            message: "Request has been sent",
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

    return (
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
                    {game.request.submit}
                </ContainedButton>
            </Grid>
        </Grid>
    );
};

export default RequestWindow;
