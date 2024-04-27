"use client";

import { Grid, SxProps, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import RequestPageRoundedIcon from "@mui/icons-material/RequestPageRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import { ReactNode } from "react";
import { CONTROLS_ICONS } from "@/utils/constants";
import ControlButton from "./controlButton";
import { useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";
import { selectGame } from "@/utils/redux/game-slice";

const ControlsPanel = () => {
    const pathname = usePathname();
    const theme = useTheme();
    const { player } = useSelector(selectAuth);
    const { game: gameObj } = useSelector(selectGame);

    const isBankerPlayer = player.id === gameObj.banker_id;

    const iconStyles: SxProps = {
        height: "100%",
        width: "auto",
    };

    const iconsMapping: { [key: string]: ReactNode } = {
        "main": <EngineeringRoundedIcon sx={iconStyles} />,
        "send": <SendRoundedIcon sx={iconStyles} />,
        "request": <RequestPageRoundedIcon sx={iconStyles} />,
        "bank": <PointOfSaleRoundedIcon sx={iconStyles} />,
        "history": <ScheduleRoundedIcon sx={iconStyles} />,
        "manage": <AdminPanelSettingsRoundedIcon sx={iconStyles} />,
    };

    return pathname.includes("game") ? (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            rowGap={{ mobile: 2, tablet: 2, laptop: 2 }}
            p={{
                mobile: "30px 10px",
                tablet: "30px 15%",
                laptop: "20px 5%",
            }}
            sx={{
                backgroundColor: theme.palette.secondary.main,
                overflow: "hidden",
                borderBottom: `1px solid ${theme.palette.primary.main}`,
            }}
        >
            {CONTROLS_ICONS.map(
                ({ path, isBankerOnly }, index) =>
                    (isBankerPlayer || !isBankerOnly) && (
                        <ControlButton
                            key={`controls icon: ${index}`}
                            path={path}
                            index={index}
                            iconsMapping={iconsMapping}
                            isBankerPlayer={isBankerPlayer}
                        />
                    )
            )}
        </Grid>
    ) : (
        <></>
    );
};

export default ControlsPanel;
