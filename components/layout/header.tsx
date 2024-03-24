"use client";

import {
    AppBar,
    Avatar,
    Button,
    Link,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import useLocale from "@/hooks/useLocale";
import { useEffect, useState } from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import { userAvatarMapping } from "@/utils/constants";
import { UserAvatar } from "@/utils/enums";
import LanguageIcon from "@mui/icons-material/Language";
import NavItems from "./navItems";
import { useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";

const Header = () => {
    const theme = useTheme();
    const { getDictLocales, toggleLocale } = useLocale();
    const { header } = getDictLocales();
    const [boxIsOpen, setBoxIsOpen] = useState(false);
    const { session, user } = useSelector(selectAuth);
    const [avatarImage, setAvatarImage] = useState(
        "/images/avatar-placeholder.png"
    );

    useEffect(() => {
        if (session?.access_token)
            setAvatarImage(userAvatarMapping()[user?.avatar as UserAvatar]);
    }, [session?.access_token, user?.avatar]);

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
                <Avatar variant="circular" src={avatarImage} />
            </Button>

            <NavItems setBoxIsOpen={setBoxIsOpen} boxIsOpen={boxIsOpen} />
        </AppBar>
    );
};

export default Header;
