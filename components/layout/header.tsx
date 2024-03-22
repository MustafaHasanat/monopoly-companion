"use client";

import {
    AppBar,
    Avatar,
    Button,
    Link,
    Stack,
    SxProps,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import useLocale from "@/hooks/useLocale";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { ReactNode, useContext, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRouter } from "next/navigation";
import CasinoIcon from "@mui/icons-material/Casino";
import { AuthContext } from "@/utils/context/auth-context";
import { logout } from "@/app/[locale]/auth/action";
import { GAME_CODE, userAvatarMapping } from "@/utils/constants";
import { UserAvatar } from "@/utils/enums";
import LanguageIcon from "@mui/icons-material/Language";

const Header = () => {
    const theme = useTheme();
    const router = useRouter();
    const { getDictLocales, toggleLocale } = useLocale();
    const { header } = getDictLocales();
    const [boxIsOpen, setBoxIsOpen] = useState(false);
    const { session, user } = useContext(AuthContext);

    const buttonsStyles: SxProps = {
        height: "100%",
    };

    const buttons: {
        text: string;
        onClick: () => void;
        Icon: ReactNode;
    }[] = session?.access_token
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
                  onClick: () => {
                      setBoxIsOpen(false);
                      window.localStorage.removeItem(GAME_CODE);
                      logout();
                      router.replace("/auth");
                  },
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
        <AppBar
            component="header"
            sx={{
                backgroundColor: theme.palette.primary.main,
                left: 0,
                top: 0,
                zIndex: 100,
                width: "100vw",
                height: "70px",
                direction: "ltr",
                p: { mobile: "0 20px", laptop: "0 40px" },
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: `0px 0px 20px 5px ${theme.palette.primary.main}`,
            }}
        >
            <Link
                href="/"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    color: theme.palette.secondary.contrastText,
                    textDecoration: "none",
                }}
            >
                <CasinoIcon
                    sx={{
                        height: "35px",
                        width: "auto",
                    }}
                />
                <Typography
                    fontSize={{ mobile: "15px", laptop: "30px" }}
                    textOverflow="ellipsis"
                >
                    {header.brandName}
                </Typography>
            </Link>

            <Button
                onClick={() => {
                    toggleLocale();
                }}
                sx={{
                    height: { mobile: "60%", laptop: "70%" },
                    width: "auto",
                    ml: "auto",
                    color: theme.palette.secondary.contrastText,
                }}
            >
                <Tooltip title={header.lang}>
                    <LanguageIcon
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </Tooltip>
            </Button>

            <Button
                onClick={() => {
                    setBoxIsOpen((prev) => !prev);
                }}
                sx={{
                    height: { mobile: "60%", laptop: "70%" },
                    width: "auto",
                }}
            >
                {session?.access_token ? (
                    <Avatar
                        variant="circular"
                        src={userAvatarMapping()[user?.avatar as UserAvatar]}
                    />
                ) : (
                    <ManageAccountsIcon
                        sx={{
                            color: theme.palette.secondary.contrastText,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                )}
            </Button>

            <Stack
                sx={{
                    transition: "height 0.3s ease",
                    position: "absolute",
                    width: "200px",
                    height: boxIsOpen ? `${buttons.length * 60}px` : "0px",
                    right: { mobile: "10px", laptop: "40px" },
                    top: { mobile: "100px", laptop: "100px" },
                    overflow: "hidden",
                    gap: "10px",
                }}
            >
                {buttons.map(({ text, onClick, Icon }, index) => (
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
        </AppBar>
    );
};

export default Header;
