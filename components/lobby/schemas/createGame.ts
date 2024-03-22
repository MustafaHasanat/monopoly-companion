import { GameTemplate } from "@/utils/enums";
import * as yup from "yup";

const createSchema = yup.object().shape({
    template: yup
        .string()
        .oneOf(
            Object.keys(GameTemplate),
            `Template must be one of: ${Object.keys(GameTemplate)}`
        )
        .required("Template is required"),
});

export default createSchema;
