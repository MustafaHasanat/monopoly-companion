"use client";

import { Button, Stack, SxProps, useTheme } from "@mui/material";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { logout } from "@/app/[locale]/auth/action";
import { GAME_CODE, getNavItems } from "@/utils/constants";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useRouter } from "next/navigation";
import useLocale from "@/hooks/useLocale";
import { endTheGameProcess } from "@/utils/helpers";
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

const buttonsStyles: SxProps = {
    height: "100%",
};

const navItemsIconsMapping: { [key: string]: ReactNode } = {
    lobby: <SportsEsportsIcon sx={buttonsStyles} />,
    account: <ManageAccountsIcon sx={buttonsStyles} />,
    logout: <LockIcon sx={buttonsStyles} />,
    "auth?active=login": <LoginIcon sx={buttonsStyles} />,
    "auth?active=register": <PersonAddIcon sx={buttonsStyles} />,
};

const NavItems = ({ boxIsOpen, setBoxIsOpen }: Props) => {
    const theme = useTheme();
    const router = useRouter();
    const { getDictLocales } = useLocale();
    const { header } = getDictLocales();
    const dispatch = useDispatch();
    const { session, user } = useSelector(selectAuth);
    const { game } = useSelector(selectGame);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (session?.access_token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [session?.access_token]);

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
        router.replace("/auth?active=login");
    };

    const handleNavItemClick = async (name: string) => {
        setBoxIsOpen(false);

        if (!["logout"].includes(name)) {
            router.replace(name);
        } else {
            await handleLogout();
        }
    };

    const navItems = getNavItems({
        header,
        isLoggedIn,
    });

    return (
        <Stack
            sx={{
                display: "grid",
                gridTemplateRows: boxIsOpen
                    ? `repeat(${navItems.length}, 1fr)`
                    : `repeat(${navItems.length}, 0fr)`,
                transition: "0.3s ease",
                position: "absolute",
                width: "200px",
                right: { mobile: "10px", laptop: "40px" },
                top: { mobile: "100px", laptop: "100px" },
                overflow: "hidden",
                gap: boxIsOpen ? "10px" : 0,
            }}
        >
            {navItems.map(({ category, name, text }, index) => (
                <Button
                    key={`header button: ${index}`}
                    onClick={async () => await handleNavItemClick(name)}
                    startIcon={navItemsIconsMapping[name as string]}
                    variant="outlined"
                    sx={{
                        transition: "0.3s ease",
                        py: boxIsOpen ? "5px" : 0,
                        color: theme.palette.secondary.contrastText,
                        fontSize: { mobile: "20px", laptop: "20px" },
                        backgroundColor: theme.palette.primary.main,
                        border: boxIsOpen
                            ? `1px solid ${theme.palette.secondary.contrastText}`
                            : "none",
                        overflow: "hidden",

                        ":hover": {
                            backgroundColor: theme.palette.secondary.main,
                            border: boxIsOpen
                                ? `1px solid ${theme.palette.secondary.contrastText}`
                                : "none",
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
