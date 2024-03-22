import { GameType } from "@/utils/types";
import { Grid, useTheme } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface Props {
    children: ReactNode;
    cords: { x: number; y: number };
}

const LobbyWindow = ({ children, cords }: Props) => {
    const theme = useTheme();

    return (
        <Grid
            justifyContent="center"
            alignItems="center"
            container
            sx={{
                position: "absolute",
                top: {
                    mobile: `${cords.y * 80}vh`,
                    laptop: `${cords.y * 100}vh`,
                },
                left: `${cords.x * 100}vw`,
                width: "100vw",
                height: { mobile: "80vh", laptop: "100vh" },
            }}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: { mobile: "85%", laptop: "30%" },
                    height: { mobile: "500px", laptop: "60%" },
                    boxShadow: `0px 0px 15px 5px ${theme.palette.primary.dark}`,
                    borderRadius: "10px",
                }}
            >
                {children}
            </Grid>
        </Grid>
    );
};

export default LobbyWindow;
