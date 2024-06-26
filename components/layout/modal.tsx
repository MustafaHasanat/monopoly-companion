"use client";

import { selectControls, setModalContent } from "@/utils/redux/controls-slice";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
    const dispatch = useDispatch();
    const { modalContent } = useSelector(selectControls);

    const ModalMap: { [key: string]: ReactNode } = {
        none: <></>,
        form: <form></form>,
    };

    return (
        <Box
            component="button"
            onClick={() => {
                dispatch(
                    setModalContent({
                        modalContent: "form",
                    })
                );
            }}
            sx={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                zIndex: modalContent !== "none" ? 100 : -100,
                backgroundColor:
                    modalContent !== "none" ? "#00000033" : "transparent",
                top: "0",
                left: "translateX(-50%) translateY(-50%)",
                opacity: 0.7,
                border: "none",
            }}
        >
            {ModalMap[modalContent]}
        </Box>
    );
};

export default Modal;
