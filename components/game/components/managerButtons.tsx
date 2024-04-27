import { ContainedButton } from "@/components/shared/button";
import { PlayerStatus } from "@/utils/enums";
import { Player } from "@/utils/types";
import { Stack, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { acceptPlayerProcess, kickPlayerProcess, rejectPlayerProcess } from "@/utils/helpers";
import { selectGame } from "@/utils/redux/game-slice";
import { selectAuth } from "@/utils/redux/auth-slice";
import useLocale from "@/hooks/useLocale";

const ManagerButtons = ({ player }: { player: Player }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { game: gameObj } = useSelector(selectGame);
    const { player: playerObj } = useSelector(selectAuth);
    const { getDictLocales } = useLocale();
    const { game } = getDictLocales();

    const getAwaitingButtons = () =>
        player.status === PlayerStatus.AWAITING && (
            <>
                <ContainedButton
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={async () => {
                        await acceptPlayerProcess({
                            game: gameObj,
                            player, // the banker sends the new player's data
                            dispatch,
                        });
                    }}
                    sx={{
                        width: "fit-content",
                        p: "5px 10px",
                        backgroundColor: theme.palette.success.main,
                    }}
                >
                    {game.manage.accept}
                </ContainedButton>
                <ContainedButton
                    startIcon={<BlockIcon />}
                    onClick={async () => {
                        await rejectPlayerProcess({
                            game: gameObj,
                            player, // the banker sends the new player's data
                            dispatch,
                        });
                    }}
                    sx={{
                        width: "fit-content",
                        p: "5px 10px",
                        backgroundColor: theme.palette.error.main,
                    }}
                >
                    {game.manage.reject}
                </ContainedButton>
            </>
        );

    const getCitizenButtons = () =>
        player.status === PlayerStatus.CITIZEN && (
            <ContainedButton
                startIcon={<CloseOutlinedIcon />}
                onClick={async () => {
                    await kickPlayerProcess({
                        game: gameObj,
                        player, // the banker sends the new player's data
                        dispatch,
                    });
                }}
                sx={{
                    width: "fit-content",
                    p: "5px 10px",
                    backgroundColor: theme.palette.error.main,
                }}
            >
                {game.manage.kick}
            </ContainedButton>
        );

    return (
        <Stack
            direction="row"
            gap="5px"
            p="auto"
            m="auto"
            justifyContent="center"
            alignItems="center"
            width="fit-content"
        >
            {getAwaitingButtons()}
            {getCitizenButtons()}
        </Stack>
    );
};

export default ManagerButtons;
