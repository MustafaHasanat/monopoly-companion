import { GameTemplate } from "@/utils/enums";
import * as yup from "yup";

const createSchema = yup.object().shape({
    template: yup
        .string()
        .oneOf(
            Object.values(GameTemplate),
            `Template must be one of: ${Object.values(GameTemplate)}`
        )
        .required("Template is required"),
});

export default createSchema;
