import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
    password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            "+8 characters, one uppercase, one lowercase, one number"
        ),
    confirm: yup
        .string()
        .required("Password Confirmation is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

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
