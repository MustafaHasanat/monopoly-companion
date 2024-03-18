"use client";

import {
    AppBar,
    Box,
    Button,
    Link,
    Stack,
    SxProps,
    Typography,
    useTheme,
} from "@mui/material";
import useLocale from "@/hooks/useLocale";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { ReactNode, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CasinoIcon from "@mui/icons-material/Casino";

const Header = () => {
    const { data: session } = useSession();
    const theme = useTheme();
    const router = useRouter();
    const { getDictLocales, getLocale } = useLocale();
    const locale = getLocale();
    const { header } = getDictLocales();
    const [boxIsOpen, setBoxIsOpen] = useState(false);

    const buttonsStyles: SxProps = {
        height: "100%",
    };

    const buttons: {
        text: string;
        onClick: () => void;
        Icon: ReactNode;
    }[] = session?.user?.email
        ? [
              {
                  text: header.play,
                  onClick: () => {
                      router.push("game");
                  },
                  Icon: <SportsEsportsIcon sx={buttonsStyles} />,
              },
              {
                  text: header.account,
                  onClick: () => {
                      router.push("account");
                  },
                  Icon: <SportsEsportsIcon sx={buttonsStyles} />,
              },
              {
                  text: header.logout,
                  onClick: () => {
                      router.push("auth?active=login");
                      signOut();
                  },
                  Icon: <LockIcon sx={buttonsStyles} />,
              },
          ]
        : [
              {
                  text: header.login,
                  onClick: () => {
                      setBoxIsOpen(false);
                      router.push("auth?active=login");
                  },
                  Icon: <LoginIcon sx={buttonsStyles} />,
              },
              {
                  text: header.register,
                  onClick: () => {
                      setBoxIsOpen(false);
                      router.push("auth?active=register");
                  },
                  Icon: <PersonAddIcon sx={buttonsStyles} />,
              },
          ];

    return (
        <AppBar
            component="header"
            sx={{
                position: "fixed",
                backgroundColor: theme.palette.primary.main,
                left: 0,
                top: 0,
                zIndex: 100,
                width: "100vw",
                height: { mobile: "70px", laptop: "70px" },
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
                <Typography fontSize={{ mobile: "25px", laptop: "30px" }}>
                    {header.brandName}
                </Typography>
            </Link>

            <Button
                onClick={() => {
                    setBoxIsOpen((prev) => !prev);
                }}
                sx={{
                    height: { mobile: "60%", laptop: "70%" },
                    width: "auto",
                }}
            >
                <ManageAccountsIcon
                    sx={{
                        color: theme.palette.secondary.contrastText,
                        width: "100%",
                        height: "100%",
                    }}
                />
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
