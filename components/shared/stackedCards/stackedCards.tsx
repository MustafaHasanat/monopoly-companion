"use client";

import { Box, Container, SxProps, keyframes, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    topCard: ReactNode;
    bottomCard: ReactNode;
    topCardIsActive: boolean;
    bgColor?: string;
    shadowColor?: string;
    rotationDegree?: number;
    offsetMove?: number;
    animationDuration?: number;
    boxSX?: SxProps;
    cardSX?: SxProps;
}

const StackedCards = (props: Props) => {
    const theme = useTheme();

    const {
        topCard,
        bottomCard,
        bgColor = theme.palette.secondary.dark,
        shadowColor = theme.palette.primary.dark,
        rotationDegree = 5,
        offsetMove = 400,
        animationDuration = 1000,
        boxSX,
        cardSX,
        topCardIsActive,
    } = props;

    const baseTransform = "translateX(-50%) translateY(-50%) translateX(0px)";
    const baseAnimation = `${animationDuration}ms ease`;
    const topTransform = "translateX(-50%) translateY(-50%) rotate(0deg)";
    const bottomTransform = `translateX(-50%) translateY(-50%) rotate(${rotationDegree}deg)`;

    const bottomToTop = keyframes`
        0% {
            transform: ${baseTransform} translateX(0px) rotate(${rotationDegree}deg);
            z-index: 1;
        }
        50% {
            transform: ${baseTransform} translateX(${offsetMove}px) rotate(${rotationDegree}deg);
            z-index: 1;
        }
        100% {
            transform: ${baseTransform} translateX(0px) rotate(0deg);
            z-index: 2;
        }
    `;
    const topToBottom = keyframes`
        0% {
            transform: ${baseTransform} translateX(0px) rotate(0deg);
            z-index: 2;
        }
        50% {
            transform: ${baseTransform} translateX(-${offsetMove}px) rotate(0deg);
            z-index: 2;
        }
        100% {
            transform: ${baseTransform} translateX(0px) rotate(${rotationDegree}deg);
            z-index: 1;
        }
    `;

    return (
        <Box
            sx={{
                position: "relative",
                width: "30vw",
                height: "70vh",
                ...boxSX,
            }}
        >
            <Container
                sx={{
                    transition: "transform 0.5 ease, z-index 0.5 ease",
                    position: "absolute",
                    backgroundColor: bgColor,
                    boxShadow: `0px 0px 10px 5px ${shadowColor}`,
                    borderRadius: "20px",
                    width: "100%",
                    height: "100%",
                    top: "50%",
                    left: "50%",
                    zIndex: topCardIsActive ? 2 : 1,
                    transform: topCardIsActive ? topTransform : bottomTransform,
                    animation: topCardIsActive
                        ? `${baseAnimation} ${bottomToTop}`
                        : `${baseAnimation} ${topToBottom}`,
                    ...cardSX,
                }}
            >
                {topCard}
            </Container>

            <Container
                sx={{
                    transition: "transform 0.5 ease",
                    position: "absolute",
                    backgroundColor: bgColor,
                    boxShadow: `0px 0px 10px 5px ${shadowColor}`,
                    borderRadius: "20px",
                    width: "100%",
                    height: "100%",
                    top: "50%",
                    left: "50%",
                    zIndex: topCardIsActive ? 1 : 2,
                    transform: topCardIsActive ? bottomTransform : topTransform,
                    animation: topCardIsActive
                        ? `${baseAnimation} ${topToBottom}`
                        : `${baseAnimation} ${bottomToTop}`,
                    ...cardSX,
                }}
            >
                {bottomCard}
            </Container>
        </Box>
    );
};

export default StackedCards;
