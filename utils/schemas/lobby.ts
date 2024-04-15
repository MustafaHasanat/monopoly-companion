import { GameTemplateType } from "@/utils/enums";
import * as yup from "yup";

export const createGameSchema = yup.object().shape({
    template: yup
        .string()
        .oneOf(
            Object.values(GameTemplateType),
            `Template must be one of: ${Object.values(GameTemplateType)}`
        )
        .required("Template is required")
        .default(GameTemplateType.CLASSIC),
});

export const joinGameSchema = yup.object().shape({
    code: yup.string().required("Game code is required"),
});
