import { PlayerAvatar } from "@/utils/enums";
import * as yup from "yup";

export const accountSchema = yup.object().shape({
    avatar: yup
        .string()
        .required("Avatar is required")
        .oneOf(
            Object.keys(PlayerAvatar),
            `Avatar must be one of: ${Object.keys(PlayerAvatar)}`
        ),
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
});
