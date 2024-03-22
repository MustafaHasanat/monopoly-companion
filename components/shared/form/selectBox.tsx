import {
    BaseSelectProps,
    MenuItem,
    Select,
    SelectProps,
    SxProps,
    InputLabel,
    FormControl,
    Typography,
} from "@mui/material";
import { useState } from "react";

interface Props extends BaseSelectProps {
    initialValue: string | number;
    values: (string | number)[];
    helperText?: string;
    labels?: string[];
    containerSX?: SxProps;
}

export function SelectBox({
    containerSX,
    initialValue,
    values,
    labels,
    helperText,
    ...rest
}: Props & Omit<SelectProps, "variant">) {
    const [value, setValue] = useState<string | number>(initialValue);

    return (
        <FormControl
            sx={{
                width: "100%",
                ...containerSX,
            }}
        >
            <InputLabel
                sx={{
                    textTransform: "capitalize",
                }}
            >
                {rest.label}
            </InputLabel>
            <Select
                variant="outlined"
                value={value}
                onChange={(event: any) => {
                    setValue(event.target.value as string | number);
                }}
                {...rest}
            >
                {values.map((item, index) => (
                    <MenuItem key={`select: ${index}`} value={item}>
                        {labels ? labels[index] : item}
                    </MenuItem>
                ))}
            </Select>
            {helperText && (
                <Typography
                    color="error"
                    sx={{
                        mt: "10px",
                        fontSize: "13px",
                    }}
                >
                    {helperText}
                </Typography>
            )}
        </FormControl>
    );
}
