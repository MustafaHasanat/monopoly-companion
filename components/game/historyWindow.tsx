"use client";

import useLocale from "@/hooks/useLocale";
import { TransactionReason } from "@/utils/enums";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const HistoryWindow = () => {
    const { getDictLocales } = useLocale();
    const { game } = getDictLocales();

    const columns: readonly {
        label: "recipient" | "amount" | "reason" | "sender";
        width?: string;
    }[] = [
        {
            label: "sender",
            width: "25%",
        },
        { label: "recipient", width: "25%" },
        { label: "amount", width: "25%" },
        {
            label: "reason",
            width: "25%",
        },
    ];

    const rows: {
        sender: string;
        recipient: string;
        amount: number;
        reason: TransactionReason;
    }[] = [
        {
            sender: "Jack",
            recipient: "Bank",
            amount: 200,
            reason: TransactionReason.RENT,
        },
        {
            sender: "Mark",
            recipient: "Bank",
            amount: 600,
            reason: TransactionReason.CHANCE,
        },
    ];

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
                                    {Object.values(row).map((value, index) => {
                                        return (
                                            <TableCell
                                                key={`history row: ${index}`}
                                                sx={{
                                                    px: 0,
                                                    py: "20px",
                                                }}
                                                align={"center"}
                                            >
                                                {value}
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

export default HistoryWindow;
