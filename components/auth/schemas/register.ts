import * as yup from "yup";

const registerSchema = yup.object().shape({
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

export default registerSchema;
