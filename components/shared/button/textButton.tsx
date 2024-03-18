import { Button, ButtonProps, SxProps, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    Icon?: ReactNode;
    sx?: SxProps;
}

export const TextButton = ({
    children,
    onClick,
    Icon,
    sx,
    ...rest
}: Props & ButtonProps) => {
    const theme = useTheme();

    return (
        <Button
            {...rest}
            variant="text"
            sx={{
                width: "fit-content",
                height: "fit-content",
                color: theme.palette.secondary.contrastText,
                p: "10px 30px",

                ":hover": {
                    color: theme.palette.primary.dark,
                },
                ...sx,
            }}
            onClick={onClick}
            startIcon={Icon}
        >
            {children}
        </Button>
    );
};
