import {
    SxProps,
    useTheme,
    SelectChangeEvent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    InputLabel,
} from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface Props {
    children: ReactNode;
    dialogIsOpen: boolean;
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
    label?: ReactNode;
    sx?: SxProps;
}

export function DialogBox({
    children,
    sx,
    label,
    dialogIsOpen,
    setDialogIsOpen,
    ...rest
}: Props) {
    const handleClose = (
        event: React.SyntheticEvent<unknown>,
        reason?: string
    ) => {
        if (reason !== "backdropClick") {
            setDialogIsOpen(false);
        }
    };

    return (
        <Dialog
            disableEscapeKeyDown
            open={dialogIsOpen}
            onClose={handleClose}
            sx={{
                ...sx,
            }}
            {...rest}
        >
            <DialogTitle>Select your avatar</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    <InputLabel>{label || ""}</InputLabel>
                    {children}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}
