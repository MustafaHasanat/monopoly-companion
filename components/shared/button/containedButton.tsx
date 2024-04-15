import { Button, ButtonProps, SxProps, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    sx?: SxProps;
}

export const ContainedButton = ({
    children,
    sx,
    ...rest
}: Props & ButtonProps) => {
    const theme = useTheme();

    return (
        <Button
            sx={{
                width: "fit-content",
                height: "fit-content",
                color: theme.palette.secondary.contrastText,
                backgroundColor: theme.palette.primary.dark,
                border: `1px solid ${theme.palette.primary.dark}`,
                boxShadow: `0px 0px 0px 0px ${theme.palette.primary.main}`,
                p: "10px 30px",

                ":hover": {
                    color: theme.palette.primary.dark,
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: `0px 0px 7px 2px ${theme.palette.primary.main}`,
                },
                ...sx,
            }}
            {...rest}
        >
            {children}
        </Button>
    );
};
