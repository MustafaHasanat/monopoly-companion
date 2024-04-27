"use client";

import useLocale from "@/hooks/useLocale";
import { TransactionReason, PlayerAvatar, PlayerStatus } from "@/utils/enums";
import { Player } from "@/utils/types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ReactNode } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Stack, useTheme } from "@mui/material";
import { ContainedButton } from "../shared/button";

const BankWindow = () => {
    const { getDictLocales } = useLocale();
    const { game } = getDictLocales();
    const theme = useTheme();

    const requestActions = (playerId: string): ReactNode => (
        <Stack
            direction="row"
            p="auto"
            m="auto"
            gap={2}
            justifyContent="space-between"
            alignItems="center"
            width="fit-content"
        >
            <ContainedButton
                startIcon={<DoneIcon />}
                onClick={() => {}}
                sx={{
                    width: "fit-content",
                    p: "5px 10px",
                    backgroundColor: theme.palette.success.main,
                }}
            >
                {"Accept"}
            </ContainedButton>
            <ContainedButton
                startIcon={<CloseOutlinedIcon />}
                onClick={() => {}}
                sx={{
                    width: "fit-content",
                    p: "5px 10px",
                    backgroundColor: theme.palette.error.main,
                }}
            >
                {"Reject"}
            </ContainedButton>
        </Stack>
    );

    const columns: readonly {
        label: "recipient" | "amount" | "reason" | "actions";
        width?: string;
    }[] = [
        { label: "recipient", width: "25%" },
        { label: "amount", width: "25%" },
        {
            label: "reason",
            width: "25%",
        },
        {
            label: "actions",
            width: "25%",
        },
    ];

    const rows: {
        recipient: Player;
        amount: number;
        reason: TransactionReason;
        actions: ReactNode;
    }[] = [
        {
            recipient: {
                id: "",
                created_at: "",
                username: "Mark",
                email: "",
                avatar: PlayerAvatar.M1,
                credit: 0,
                status: PlayerStatus.GHOST,
                game_id: "",
            },
            amount: 200,
            reason: TransactionReason.RENT,
            actions: requestActions(""),
        },
    ];

    const getCellValue = (key: string, value: any): ReactNode => {
        if (key === "amount") return value;
        else if (key === "reason") return game.reasons[value as TransactionReason];
        else if (key === "recipient") return value.username;
        else return value;
    };

    return (
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
                        {rows.map((row, index) => {
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
    );
};

export default BankWindow;
