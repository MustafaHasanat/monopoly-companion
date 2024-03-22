import { Grid, Typography, useTheme } from "@mui/material";
import { ContainedButton } from "../shared/button";
import { Dispatch, SetStateAction } from "react";
import useLocale from "@/hooks/useLocale";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import SportsEsportsTwoToneIcon from "@mui/icons-material/SportsEsportsTwoTone";
import { CordsType } from "@/utils/types";
import { LOBBY_CORDS } from "@/utils/constants/game";

const StartGame = ({
    setCords,
}: {
    setCords: Dispatch<SetStateAction<CordsType>>;
}) => {
    const { getDictLocales } = useLocale();
    const { lobby } = getDictLocales();
    const theme = useTheme();

    return (
        <Grid container rowGap={5} justifyContent="center" alignItems="center">
            <Grid container item mobile={12}>
                <Typography
                    m="auto"
                    variant="h4"
                    width="80%"
                    textAlign="center"
                    sx={{
                        span: {
                            textTransform: "capitalize",
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    {lobby.start.title1}
                    <span>{lobby.start.create}</span>
                    {lobby.start.title2}
                    <span>{lobby.start.join}</span>
                    {lobby.start.title3}
                </Typography>
            </Grid>

            <Grid container item mobile={12}>
                <ContainedButton
                    startIcon={<GamepadTwoToneIcon />}
                    sx={{
                        m: "auto",
                        width: { mobile: "70%", laptop: "200px" },
                    }}
                    onClick={() => {
                        setCords(LOBBY_CORDS.create);
                    }}
                >
                    {lobby.start.createButton}
                </ContainedButton>
            </Grid>

            <Grid container item mobile={12}>
                <ContainedButton
                    startIcon={<SportsEsportsTwoToneIcon />}
                    sx={{
                        m: "auto",
                        width: { mobile: "70%", laptop: "200px" },
                    }}
                    onClick={() => {
                        setCords(LOBBY_CORDS.join);
                    }}
                >
                    {lobby.start.joinButton}
                </ContainedButton>
            </Grid>
        </Grid>
    );
};

export default StartGame;
