"use client";

import { Grid, Typography } from "@mui/material";
import useLocale from "@/hooks/useLocale";
import { UserStatus } from "@/utils/enums";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ReactNode } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Stack, useTheme } from "@mui/material";
import { ContainedButton } from "../shared/button";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { useSelector } from "react-redux";
import { selectGame } from "@/utils/redux/game-slice";
import { Player } from "@/utils/types";

const ManageWindow = () => {
    const { getDictLocales } = useLocale();
    const { game } = getDictLocales();
    const theme = useTheme();
    const { game: gameObj, players } = useSelector(selectGame);

    const requestActions = (playerId: string): ReactNode => (
        <Stack
            direction="row"
            p="auto"
            m="auto"
            justifyContent="center"
            alignItems="center"
            width="fit-content"
        >
            <ContainedButton
                startIcon={<CloseOutlinedIcon />}
                onClick={() => {}}
                sx={{
                    width: "fit-content",
                    p: "5px 10px",
                    backgroundColor: theme.palette.error.main,
                }}
            >
                {"Kick out"}
            </ContainedButton>
        </Stack>
    );

    const columns: readonly {
        label: "name" | "status" | "actions";
        width?: string;
    }[] = [
        { label: "name", width: "33%" },
        {
            label: "status",
            width: "33%",
        },
        {
            label: "actions",
            width: "33%",
        },
    ];

    const getRows = () =>
        players.map((player) => ({
            username: player.username,
            status: player.status,
            actions: requestActions(""),
        }));

    const getCellValue = (key: string, value: any): ReactNode => {
        if (key === "username") return value;
        else if (key === "status") return game.statusValues[value as UserStatus];
        else return value;
    };

    return (
        <>
            {/* players section title */}
            <Grid container item justifyContent="center">
                <Typography variant="h5">{game.manage.players}</Typography>
            </Grid>

            {/* players list */}
            <Grid container item justifyContent="center">
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map(({ label, width }, index) => (
                                        <TableCell
                                            key={`request column: ${index}`}
                                            align={"center"}
                                            style={{ width }}
                                        >
                                            {game[label]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {getRows().map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={`request row: ${index}`}
                                        >
                                            {Object.entries(row).map(([key, value]) => {
                                                return (
                                                    <TableCell
                                                        key={key}
                                                        sx={{
                                                            px: 0,
                                                            py: "20px",
                                                        }}
                                                        align={"center"}
                                                    >
                                                        {getCellValue(key, value)}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>

            {/* controls section title */}
            <Grid container item justifyContent="center">
                <Typography variant="h5">{game.manage.controls}</Typography>
            </Grid>

            {/* transfer banker button */}
            <Grid container item justifyContent="center">
                <ContainedButton
                    startIcon={<AccountBalanceOutlinedIcon />}
                    onClick={() => {}}
                    sx={{
                        width: { mobile: "100%", tablet: "50%" },
                    }}
                >
                    {game.manage.transferButton}
                </ContainedButton>
            </Grid>

            {/* change players credit button */}
            <Grid container item justifyContent="center">
                <ContainedButton
                    startIcon={<PaidOutlinedIcon />}
                    onClick={() => {}}
                    sx={{
                        width: { mobile: "100%", tablet: "50%" },
                    }}
                >
                    {game.manage.changeCreditButton}
                </ContainedButton>
            </Grid>

            {/* restart the game button */}
            <Grid container item justifyContent="center">
                <ContainedButton
                    startIcon={<RestartAltOutlinedIcon />}
                    onClick={() => {}}
                    sx={{
                        width: { mobile: "100%", tablet: "50%" },
                        backgroundColor: theme.palette.error.main,
                    }}
                >
                    {game.manage.restartButton}
                </ContainedButton>
            </Grid>

            {/* end the game button */}
            <Grid container item justifyContent="center">
                <ContainedButton
                    startIcon={<PowerSettingsNewRoundedIcon />}
                    onClick={() => {}}
                    sx={{
                        width: { mobile: "100%", tablet: "50%" },
                        backgroundColor: theme.palette.error.main,
                    }}
                >
                    {game.manage.endButton}
                </ContainedButton>
            </Grid>
        </>
    );
};

export default ManageWindow;
