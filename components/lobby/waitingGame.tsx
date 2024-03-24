import { CircularProgress, Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ContainedButton } from "../shared/button";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import useLocale from "@/hooks/useLocale";
import { useRouter } from "next/navigation";
import { ControlsContext } from "@/utils/context/controls-context";
import { CordsType } from "@/utils/types";
import { LOBBY_CORDS } from "@/utils/constants/game";
import { AuthContext } from "@/utils/context/auth-context";
import { GameContext } from "@/utils/context/game-context";
import { selectGame } from "@/utils/redux/game-slice";
import { selectAuth } from "@/utils/redux/auth-slice";
import { useSelector } from "react-redux";

interface Props {
    setCords: Dispatch<SetStateAction<CordsType>>;
}
const WaitingGame = ({ setCords }: Props) => {
    const { getDictLocales } = useLocale();
    const { lobby } = getDictLocales();
    // const { user } = useContext(AuthContext);
    // const { game } = useContext(GameContext);
    const { user } = useSelector(selectAuth);
    const { game } = useSelector(selectGame);

    useEffect(() => {
        // TODO: needs web-socket
        // window.localStorage.setItem(
        //     GAME_CODE,
        //     response?.data[0] as string
        // );
    }, [game, user]);

    return (
        <Grid
            container
            rowGap={3}
            justifyContent="center"
            alignContent="center"
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
                    {lobby.waiting.title}
                </Typography>
            </Grid>

            <Grid container item mobile={2}>
                <Typography
                    m="auto"
                    variant="subtitle1"
                    width="80%"
                    textAlign="center"
                >
                    {lobby.waiting.code}
                </Typography>
            </Grid>

            <Grid container item mobile={10}>
                <Typography
                    m="auto"
                    variant="subtitle1"
                    width="80%"
                    textAlign="left"
                >
                    <span>{game?.code || "-------"}</span>
                </Typography>
            </Grid>

            <Grid container item mobile={2}>
                <Typography
                    m="auto"
                    variant="subtitle1"
                    width="80%"
                    textAlign="center"
                >
                    {lobby.waiting.host}
                </Typography>
            </Grid>

            <Grid container item mobile={10}>
                <Typography
                    m="auto"
                    variant="subtitle1"
                    width="80%"
                    textAlign="left"
                >
                    <span>{user?.username || "-------"}</span>
                </Typography>
            </Grid>

            <Grid container item mobile={12}>
                <CircularProgress
                    size={70}
                    sx={{
                        m: "auto",
                    }}
                />
            </Grid>

            <Grid container item mobile={12}>
                <ContainedButton
                    disabled
                    startIcon={<CancelTwoToneIcon />}
                    onClick={() => {
                        setCords(LOBBY_CORDS.join);
                    }}
                    sx={{
                        m: "auto",
                    }}
                >
                    cancel
                </ContainedButton>
            </Grid>
        </Grid>
    );
};

export default WaitingGame;
