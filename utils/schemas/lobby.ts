import { GameTemplate } from "@/utils/enums";
import * as yup from "yup";

export const createGameSchema = yup.object().shape({
    template: yup
        .string()
        .oneOf(
            Object.values(GameTemplate),
            `Template must be one of: ${Object.values(GameTemplate)}`
        )
        .required("Template is required")
        .default(GameTemplate.CLASSIC),
});

export const joinGameSchema = yup.object().shape({
    code: yup.string().required("Game code is required"),
});
