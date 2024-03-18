import { SxProps, useTheme, TextField, TextFieldProps } from "@mui/material";

interface Props {
    sx?: SxProps;
}

export const TextFieldForm = ({ sx, ...rest }: Props & TextFieldProps) => {
    const theme = useTheme();

    return (
        <TextField
            {...rest}
            variant="standard"
            sx={{
                width: "80%",
                ...sx,
            }}
        />
    );
};
