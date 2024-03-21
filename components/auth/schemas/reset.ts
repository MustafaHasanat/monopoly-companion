import * as yup from "yup";

export const passwordSchema = yup.object().shape({
    password: yup.string().required("Old password is required"),
    newPassword: yup
        .string()
        .required("New password is required")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            "+8 characters, one uppercase, one lowercase, one number"
        ),
    confirm: yup
        .string()
        .required("Password Confirmation is required")
        .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
