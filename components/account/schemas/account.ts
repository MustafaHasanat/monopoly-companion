import { UserAvatar } from "@/utils/enums";
import * as yup from "yup";

export const schema = yup.object().shape({
    avatar: yup
        .string()
        .required("Avatar is required")
        .oneOf(
            Object.keys(UserAvatar),
            `Avatar must be one of: ${Object.keys(UserAvatar)}`
        ),
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
});
