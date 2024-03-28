import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const ControlButton = ({
    isBankerPlayer,
    path,
    index,
    iconsMapping,
}: {
    isBankerPlayer: boolean;
    path: string;
    index: number;
    iconsMapping: {
        [key: string]: ReactNode;
    };
}) => {
    const router = useRouter();

    return (
        <Grid
            container
            item
            mobile={isBankerPlayer ? 4 : 3}
            tablet={isBankerPlayer ? 2 : 3}
            laptop={isBankerPlayer ? 2 : 3}
            key={`controls icon: ${index}`}
        >
            <Button
                onClick={() => {
                    router.replace(`game?active=${path}`);
                }}
                sx={{
                    height: "auto",
                    width: "auto",
                    m: "auto",
                }}
            >
                {iconsMapping[path]}
            </Button>
        </Grid>
    );
};

export default ControlButton;
