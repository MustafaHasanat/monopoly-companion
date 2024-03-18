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
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
        ),
    confirm: yup
        .string()
        .required("Password Confirmation is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default registerSchema;
