"use client";

import { AuthContext } from "@/utils/context/auth-context";
import { Button, Stack, SxProps, useTheme } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useContext } from "react";
import { endTheGame, getGameByCode } from "@/app/[locale]/game/action";
import { changeUserStatus, logout } from "@/app/[locale]/auth/action";
import { GAME_CODE } from "@/utils/constants";
import { UserStatus } from "@/utils/enums";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useRouter } from "next/navigation";
import useLocale from "@/hooks/useLocale";
import { endTheGameProcess } from "@/utils/helpers";
import { GameContext } from "@/utils/context/game-context";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";
import { selectGame } from "@/utils/redux/game-slice";

type NavButtonType = {
    text: string;
    onClick: () => void;
    Icon: ReactNode;
};

interface Props {
    boxIsOpen: boolean;
    setBoxIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavItems = ({ boxIsOpen, setBoxIsOpen }: Props) => {
    const theme = useTheme();
    // const { session, user, setUser } = useContext(AuthContext);
    // const { setGame, game } = useContext(GameContext);
    const router = useRouter();
    const { getDictLocales } = useLocale();
    const { header } = getDictLocales();
    const dispatch = useDispatch();
    const { session, user } = useSelector(selectAuth);
    const { game } = useSelector(selectGame);

    const buttonsStyles: SxProps = {
        height: "100%",
    };

    const handleLogout = async () => {
        setBoxIsOpen(false);
        // get the game code form the device
        const code = window.localStorage.getItem(GAME_CODE);
        // only proceed to this if the user is currently playing a game
        if (code) {
            // end the game
            await endTheGameProcess({
                code,
                user,
                game,
                dispatch,
            });
        }
        // log out the user and redirect them
        logout();
        router.replace("/auth");
    };

    const navButtons: NavButtonType[] = session?.access_token
        ? [
              {
                  text: header.play,
                  onClick: () => {
                      setBoxIsOpen(false);
                      router.replace("lobby");
                  },
                  Icon: <SportsEsportsIcon sx={buttonsStyles} />,
              },
              {
                  text: header.account,
                  onClick: () => {
                      setBoxIsOpen(false);
                      router.replace("account");
                  },
                  Icon: <ManageAccountsIcon sx={buttonsStyles} />,
              },
              {
                  text: header.logout,
                  onClick: handleLogout,
                  Icon: <LockIcon sx={buttonsStyles} />,
              },
          ]
        : [
              {
                  text: header.login,
                  onClick: () => {
                      setBoxIsOpen(false);
                      router.replace("auth?active=login");
                  },
                  Icon: <LoginIcon sx={buttonsStyles} />,
              },
              {
                  text: header.register,
                  onClick: () => {
                      setBoxIsOpen(false);
                      router.replace("auth?active=register");
                  },
                  Icon: <PersonAddIcon sx={buttonsStyles} />,
              },
          ];

    return (
        <Stack
            sx={{
                transition: "height 0.3s ease",
                position: "absolute",
                width: "200px",
                height: boxIsOpen ? `${navButtons.length * 60}px` : "0px",
                right: { mobile: "10px", laptop: "40px" },
                top: { mobile: "100px", laptop: "100px" },
                overflow: "hidden",
                gap: "10px",
            }}
        >
            {navButtons.map(({ text, onClick, Icon }, index) => (
                <Button
                    key={`header button: ${index}`}
                    onClick={onClick}
                    startIcon={Icon}
                    variant="outlined"
                    sx={{
                        color: theme.palette.secondary.contrastText,
                        height: { mobile: "60px", laptop: "60px" },
                        fontSize: { mobile: "20px", laptop: "20px" },
                        backgroundColor: theme.palette.primary.main,
                        border: `1px solid ${theme.palette.secondary.contrastText}`,

                        ":hover": {
                            backgroundColor: theme.palette.secondary.main,
                            border: `1px solid ${theme.palette.secondary.contrastText}`,
                        },
                    }}
                >
                    {text}
                </Button>
            ))}
        </Stack>
    );
};

export default NavItems;
