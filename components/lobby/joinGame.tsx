import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ContainedButton } from "../shared/button";
import useLocale from "@/hooks/useLocale";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import joinSchema from "./schemas/joinGame";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SportsEsportsTwoToneIcon from "@mui/icons-material/SportsEsportsTwoTone";
import { TextFieldForm } from "../shared/form";
import { getGameByCode } from "@/app/[locale]/game/action";
import { CordsType } from "@/utils/types";
import { LOBBY_CORDS } from "@/utils/constants/game";
import { useDispatch, useSelector } from "react-redux";
import { controlsSlice } from "@/utils/redux/controls-slice";
import { gameSlice } from "@/utils/redux/game-slice";
import { useSearchParams } from "next/navigation";

interface Props {
    setCords: Dispatch<SetStateAction<CordsType>>;
}

const JoinGame = ({ setCords }: Props) => {
    const { getDictLocales } = useLocale();
    const { lobby } = getDictLocales();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(joinSchema),
        defaultValues: {
            code: code || "",
        },
    });

    const onSubmit = async (formData: { code: string }) => {
        const response = await getGameByCode({
            code: formData.code.trim(),
        });

        if (!response.error) {
            if (response?.data.length !== 0) {
                dispatch(
                    controlsSlice.actions.setSnackbarState({
                        snackbarState: {
                            message: "Correct game code, join request is sent",
                            severity: "success",
                        },
                    })
                );
                dispatch(
                    gameSlice.actions.setGame({
                        game: response?.data[0],
                    })
                );
                setCords(LOBBY_CORDS.waiting);
            } else {
                dispatch(
                    controlsSlice.actions.setSnackbarState({
                        snackbarState: {
                            message:
                                "Wrong game code or game doesn't exist, try again",
                            severity: "error",
                        },
                    })
                );
            }
        } else {
            dispatch(
                controlsSlice.actions.setSnackbarState({
                    snackbarState: {
                        message: response.error.message,
                        severity: "error",
                    },
                })
            );
        }
    };

    return (
        <Grid
            container
            rowGap={5}
            justifyContent="center"
            alignContent="center"
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            mobile={12}
            p={{ mobile: "20px" }}
        >
            <Grid container item mobile={12}>
                <Typography
                    m="auto"
                    variant="h4"
                    width="80%"
                    textAlign="center"
                >
                    {lobby.join.title}
                </Typography>
            </Grid>

            <Grid container item mobile={12}>
                <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            label={lobby.join.code}
                            error={!!errors.code}
                            helperText={errors.code?.message}
                            sx={{
                                width: "100%",
                                m: "auto",
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid container item mobile={5}>
                <ContainedButton
                    type="button"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => {
                        setCords(LOBBY_CORDS.start);
                    }}
                    sx={{
                        width: "fit-content",
                        mr: "auto",
                    }}
                >
                    {lobby.backButton}
                </ContainedButton>
            </Grid>

            <Grid container item mobile={7}>
                <ContainedButton
                    type="submit"
                    startIcon={<SportsEsportsTwoToneIcon />}
                    sx={{
                        width: "100%",
                    }}
                >
                    {lobby.join.joinButton}
                </ContainedButton>
            </Grid>
        </Grid>
    );
};

export default JoinGame;
