import * as yup from "yup";

const joinSchema = yup.object().shape({
    code: yup.string().required("Game code is required"),
});

export default joinSchema;
