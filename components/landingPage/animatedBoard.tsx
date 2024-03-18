"use client";

import { Avatar, Box, SxProps, useTheme } from "@mui/material";

interface Props {
    sx?: SxProps;
}

const AnimatedBoard = ({ sx }: Props) => {
    const theme = useTheme();

    const squares: {}[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(4, 1fr)",
                gap: "20px",
                width: "70%",
                aspectRatio: "1",
                ...sx,
            }}
        >
            {squares.map(({}, index) => (
                <Box
                    key={`animated square ${index}`}
                    sx={{
                        width: "auto",
                        borderRadius: "10px",
                        aspectRatio: "1",
                        backgroundColor: theme.palette.primary.dark,
                    }}
                ></Box>
            ))}

            <Avatar
                src="/icons/dice.png"
                sx={{
                    m: "auto",
                    width: "80%",
                    height: "80%",
                    borderRadius: "10px",
                    gridRow: "2 / 4",
                    gridColumn: "2 / 4",
                }}
            />
        </Box>
    );
};

export default AnimatedBoard;
