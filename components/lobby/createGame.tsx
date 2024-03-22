import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useContext } from "react";
import { ContainedButton } from "../shared/button";
import createSchema from "./schemas/createGame";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import useLocale from "@/hooks/useLocale";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SelectBox, TextFieldForm } from "../shared/form";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import { GameTemplate } from "@/utils/enums";
import { GAME_CODE, gameTemplateMapping } from "@/utils/constants";
import { createNewGame } from "@/app/[locale]/lobby/action";
import { ControlsContext } from "@/utils/context/controls-context";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/context/auth-context";
import { CordsType } from "@/utils/types";
import { LOBBY_CORDS } from "@/utils/constants/game";

const CreateGame = ({
    setCords,
}: {
    setCords: Dispatch<SetStateAction<CordsType>>;
}) => {
    const { getDictLocales } = useLocale();
    const { lobby } = getDictLocales();
    const { setSnackbarState } = useContext(ControlsContext);
    const { user } = useContext(AuthContext);
    const router = useRouter();

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
            setSnackbarState({
                message: "Game is created successfully",
                severity: "success",
            });

            window.localStorage.setItem(GAME_CODE, codeResponse.data as string);

            setTimeout(() => {
                router.replace("/game");
            }, 1500);
        } else {
            setSnackbarState({
                message: response.error.message,
                severity: "error",
            });
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
