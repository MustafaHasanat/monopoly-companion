import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useContext } from "react";
import { ContainedButton } from "../shared/button";
import createSchema from "./schemas/createGame";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import useLocale from "@/hooks/useLocale";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SelectBox } from "../shared/form";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import { GameTemplate } from "@/utils/enums";
import { gameTemplateMapping } from "@/utils/constants";
import { createNewGame } from "@/app/[locale]/lobby/action";
import { useRouter } from "next/navigation";
import { CordsType } from "@/utils/types";
import { LOBBY_CORDS } from "@/utils/constants/game";
import { startTheGameProcess } from "@/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";
import { controlsSlice } from "@/utils/redux/controls-slice";

const CreateGame = ({
    setCords,
}: {
    setCords: Dispatch<SetStateAction<CordsType>>;
}) => {
    const { getDictLocales } = useLocale();
    const { lobby } = getDictLocales();
    // const { setSnackbarState } = useContext(ControlsContext);
    // const { user, setUser } = useContext(AuthContext);
    // const { setGame } = useContext(GameContext);
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector(selectAuth);

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(createSchema),
    });

    const onSubmit = async (formData: { template: string }) => {
        const { response, codeResponse } = await createNewGame({
            template: formData.template,
            banker_id: user.id,
        });

        if (!response.error) {
            dispatch(
                controlsSlice.actions.setSnackbarState({
                    snackbarState: {
                        message: "Game is created successfully",
                        severity: "success",
                    },
                })
            );
            // setSnackbarState({
            //     message: "Game is created successfully",
            //     severity: "success",
            // });
            // start the game
            await startTheGameProcess({
                code: codeResponse.data || "",
                user,
                game: response.data[0],
                dispatch,
            });
            // redirect the user
            setTimeout(() => {
                router.replace("/game");
            }, 1500);
        } else {
            dispatch(
                controlsSlice.actions.setSnackbarState({
                    snackbarState: {
                        message: response.error.message,
                        severity: "error",
                    },
                })
            );
            // setSnackbarState({
            //     message: response.error.message,
            //     severity: "error",
            // });
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
                    {lobby.create.title}
                </Typography>
            </Grid>

            <Grid container item mobile={12}>
                <Controller
                    name="template"
                    control={control}
                    render={({ field }) => (
                        <SelectBox
                            {...field}
                            initialValue={GameTemplate.CLASSIC}
                            label={lobby.create.template}
                            values={Object.keys(GameTemplate)}
                            labels={Object.values(gameTemplateMapping())}
                            helperText={errors.template?.message}
                            error={!!errors.template}
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
                    startIcon={<GamepadTwoToneIcon />}
                    onClick={() => {}}
                    sx={{
                        width: "100%",
                    }}
                >
                    {lobby.create.createButton}
                </ContainedButton>
            </Grid>
        </Grid>
    );
};

export default CreateGame;
