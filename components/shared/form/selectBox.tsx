import { BaseSelectProps, MenuItem, Select, SxProps } from "@mui/material";
import { useState } from "react";

interface Props extends BaseSelectProps {
    initialValue: string | number;
    values: (string | number)[];
    labels?: string[];
    sx?: SxProps;
}

export function SelectBox({
    sx,
    initialValue,
    values,
    labels,
    ...rest
}: Props) {
    const [value, setValue] = useState<string | number>(initialValue);

    return (
        <Select
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
    );
}
