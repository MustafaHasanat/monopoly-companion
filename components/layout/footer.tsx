"use client";

import useLocale from "@/hooks/useLocale";
import { SOCIAL_ICONS } from "@/utils/constants";
import {
    Avatar,
    Grid,
    IconButton,
    Link,
    SxProps,
    Typography,
    useTheme,
} from "@mui/material";
import { ReactNode } from "react";

const Footer = () => {
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

    return (
        <Grid
            container
            component="footer"
            flexDirection="column"
            height="fit-content"
            width="100%"
            justifyContent="center"
            alignItems="center"
            p="30px 0"
            gap="20px"
            sx={{
                backgroundColor: theme.palette.primary.dark,
            }}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
            >
                {SOCIAL_ICONS.map(({ src, url }, index) => (
                    <Link href={url} key={`footer social: ${index}`}>
                        <IconButton
                            sx={{
                                width: "50px",
                                aspectRatio: "1",
                            }}
                        >
                            <Avatar
                                src={src}
                                variant="rounded"
                                sx={buttonsStyles}
                            />
                        </IconButton>
                    </Link>
                ))}
            </Grid>
            <Typography
                textTransform="capitalize"
                width="90%"
                textAlign="center"
                sx={{
                    opacity: 0.7,
                }}
            >
                &copy; {footer.copyRights}
            </Typography>
        </Grid>
    );
};

export default Footer;
