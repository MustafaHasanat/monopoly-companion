"use client";

import useLocale from "@/hooks/useLocale";
import { Grid, Typography } from "@mui/material";

const ManageWindow = () => {
    const { getDictLocales } = useLocale();
    const { game } = getDictLocales();

    return (
        <>
            <Grid container item justifyContent="center">
                <Typography variant="h5">{game.manage.players}</Typography>
            </Grid>
            <Grid container item justifyContent="center"></Grid>
        </>
    );
};

export default ManageWindow;
