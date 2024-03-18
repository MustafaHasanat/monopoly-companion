"use client";

import useLocale from "@/hooks/useLocale";
import {
    Avatar,
    Box,
    IconButton,
    Link,
    Stack,
    SxProps,
    Typography,
    useTheme,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ReactNode } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = ({}) => {
    const theme = useTheme();
    const { getDictLocales } = useLocale();
    const { footer } = getDictLocales();

    const buttonsStyles: SxProps = {
        width: "100%",
        height: "100%",
        opacity: 0.7,
        transition: "opacity 0.3s ease",
        color: theme.palette.secondary.main,

        ":hover": {
            opacity: 1,
        },
    };

    const socials: {
        icon: ReactNode;
        url: string;
    }[] = [
        {
            icon: (
                <Avatar
                    src="/icons/linkedin-logo.png"
                    variant="rounded"
                    sx={buttonsStyles}
                />
            ),
            url: "https://www.linkedin.com/in/mustafa-alhasanat",
        },
        {
            icon: (
                <Avatar
                    src="/icons/github-logo.png"
                    variant="rounded"
                    sx={buttonsStyles}
                />
            ),
            url: "https://github.com/MustafaHasanat",
        },
        {
            icon: (
                <Avatar
                    src="/icons/npm-logo.png"
                    variant="rounded"
                    sx={buttonsStyles}
                />
            ),
            url: "https://www.npmjs.com/~mustafa-alhasanat",
        },
        {
            icon: (
                <Avatar
                    src="/icons/udemy-logo.png"
                    variant="rounded"
                    sx={buttonsStyles}
                />
            ),
            url: "https://www.udemy.com/user/mustfa-alhasana",
        },
        {
            icon: (
                <Avatar
                    src="/icons/calendly-logo.png"
                    variant="rounded"
                    sx={buttonsStyles}
                />
            ),
            url: "https://calendly.com/mustafa-hasanat/interview",
        },
    ];

    return (
        <Stack
            component="footer"
            sx={{
                backgroundColor: theme.palette.primary.dark,
                height: "fit-content",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: "30px 0",
                gap: "20px",
            }}
        >
            <Stack direction="row" justifyContent="center" alignItems="center">
                {socials.map(({ icon, url }, index) => (
                    <Link href={url} key={`footer social: ${index}`}>
                        <IconButton
                            sx={{
                                width: "50px",
                                aspectRatio: "1",
                            }}
                        >
                            {icon}
                        </IconButton>
                    </Link>
                ))}
            </Stack>
            <Typography
                textTransform="capitalize"
                sx={{
                    opacity: 0.7,
                }}
            >
                &copy; {footer.copyRights}
            </Typography>
        </Stack>
    );
};

export default Footer;
