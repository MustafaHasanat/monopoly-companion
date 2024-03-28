"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import useLocale from "@/hooks/useLocale";
import useAsyncStates from "@/hooks/useAsyncStates";
import { AVATAR_PLACEHOLDER, userAvatarMapping } from "@/utils/constants";
import { selectAuth } from "@/utils/redux/auth-slice";
import { selectGame } from "@/utils/redux/game-slice";
import {
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ContainedButton } from "../shared/button";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { UserStatus } from "@/utils/enums";
import { controlsSlice } from "@/utils/redux/controls-slice";
import { endTheGameProcess } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React from "react";
import PlayerCard from "./playerCard";

const MainWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard({ page: "game" });
    const { game: gameObj } = useSelector(selectGame);
    const { user } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const { getDictLocales } = useLocale();
    const { game } = getDictLocales();
    const theme = useTheme();
    const router = useRouter();

    const [avatarImg, username, userCredit, userStatus, gameCode] =
        useAsyncStates({
            dependents: [user, gameObj],
            initialStates: [AVATAR_PLACEHOLDER, "", 0, UserStatus.GHOST, ""],
            finalStates: [
                userAvatarMapping()[user.avatar],
                user.username,
                user.credit,
                user.status,
                gameObj.code,
            ],
        });

    const handleRedButton = async () => {
        userStatus === UserStatus.BANKER;
        // only proceed to this if the user is currently playing a game
        if (gameObj.code) {
            // end the game
            await endTheGameProcess({
                user,
                game: gameObj,
                dispatch,
            });
        }
        // redirect the user
        router.replace("/lobby");
    };

    const handleWhatsappShare = () => {
        if (window && window.location) {
            const joinLink = `${window.location.href}?code=${gameCode}`;
            const joinMessage =
                `Join me on Monopoly Companion with code: ${gameCode}. Following this link: ${joinLink}`.replaceAll(
                    " ",
                    "%20"
                );
            const whatsappURL = `https://wa.me/?text=${joinMessage}`;

            window.open(whatsappURL);
        }
    };

    const handleCopyButton = () => {
        if (navigator) {
            navigator.clipboard.writeText(gameCode);

            dispatch(
                controlsSlice.actions.setSnackbarState({
                    snackbarState: {
                        message: "Copied to clipboard!",
                        severity: "success",
                    },
                })
            );
        }
    };

    return !isAccessible ? (
        loadingComponent
    ) : (
        <>
            {/* player details */}
            <Grid container gap={2}>
                <Grid container item mobile={4}>
                    <Avatar
                        src={avatarImg}
                        alt="avatar"
                        sx={{
                            m: "auto",
                            width: "80%",
                            height: "auto",
                        }}
                    />
                </Grid>

                <Grid container mobile={6}>
                    <Grid container item>
                        <Typography variant="h5">{username}</Typography>
                    </Grid>
                    <Grid container item>
                        <Typography
                            variant="h6"
                            sx={{ opacity: 0.7 }}
                        >{`${game.main.credit}${userCredit}$`}</Typography>
                    </Grid>
                    <Grid container item>
                        <Typography
                            variant="h6"
                            sx={{ opacity: 0.7 }}
                        >{`${game.main.role}${userStatus}`}</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Divider
                sx={{
                    width: "100%",
                }}
            />

            {/* current players list */}
            <Grid container gap={2} justifyContent="center">
                <Grid container item justifyContent="center">
                    <Typography variant="h5">{game.main.players}</Typography>
                </Grid>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                >
                    {[
                        user,
                        {
                            ...user,
                            status: UserStatus.CITIZEN,
                        },
                        {
                            ...user,
                            status: UserStatus.CITIZEN,
                            credit: 1000,
                        },
                        {
                            ...user,
                            status: UserStatus.CITIZEN,
                            credit: 1000,
                        },
                    ].map((player, index) => (
                        <React.Fragment key={`player item: ${index}`}>
                            <PlayerCard player={player} />
                        </React.Fragment>
                    ))}
                </List>
            </Grid>

            <Divider
                sx={{
                    width: "100%",
                }}
            />

            {/* game code */}
            <Grid container item>
                <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{ opacity: 0.7, m: "auto" }}
                >{`${game.main.code}${gameCode}`}</Typography>
            </Grid>

            {/* copy button */}
            <Grid container item justifyContent="center">
                <ContainedButton
                    startIcon={<ContentCopyRoundedIcon />}
                    onClick={handleCopyButton}
                    sx={{
                        width: { mobile: "100%", tablet: "50%" },
                    }}
                >
                    {game.main.copy}
                </ContainedButton>
            </Grid>

            {/* whatsapp button */}
            <Grid container item justifyContent="center">
                <ContainedButton
                    startIcon={<WhatsAppIcon />}
                    onClick={handleWhatsappShare}
                    sx={{
                        width: { mobile: "100%", tablet: "50%" },
                        backgroundColor: theme.palette.success.main,
                    }}
                >
                    {game.main.share}
                </ContainedButton>
            </Grid>

            {/* red button */}
            <Grid container item justifyContent="center">
                <ContainedButton
                    startIcon={
                        userStatus === UserStatus.BANKER ? (
                            <PowerSettingsNewRoundedIcon />
                        ) : (
                            <LogoutRoundedIcon />
                        )
                    }
                    onClick={handleRedButton}
                    sx={{
                        width: { mobile: "100%", tablet: "50%" },
                        backgroundColor: theme.palette.error.main,
                    }}
                >
                    {userStatus === UserStatus.BANKER
                        ? game.main.end
                        : game.main.leave}
                </ContainedButton>
            </Grid>
        </>
    );
};

export default MainWindow;
