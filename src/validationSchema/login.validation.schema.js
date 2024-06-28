import * as yup from "yup";

export const loginUserValidationSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("Email is required.")
    .trim()
    .max(60, "Email must be at max 60 characters.")
    .lowercase(),
  password: yup.string().required("Password is required.").trim(),
});
