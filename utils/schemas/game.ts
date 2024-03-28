import * as yup from "yup";
import { TransactionReason } from "../enums";

export const sendSchema = (recipients: string[]) =>
    yup.object().shape({
        recipient: yup
            .string()
            .required("Recipient is required")
            .oneOf(recipients, `Recipient must be one of the current players`),
        reason: yup
            .string()
            .required("Reason is required")
            .oneOf(
                Object.values(TransactionReason),
                `Reason must be one of: ${Object.values(TransactionReason)}`
            ),
        amount: yup.number().required("Amount is required").min(1),
    });

export const requestSchema = yup.object().shape({
    reason: yup
        .string()
        .required("Reason is required")
        .oneOf(
            Object.values(TransactionReason),
            `Reason must be one of: ${Object.values(TransactionReason)}`
        ),
    amount: yup.number().required("Amount is required").min(1),
});
