import * as Yup from "yup";

export const jobFormValidationSchema = Yup.object({
  title: Yup.string()
    .required("Job title is required.")
    .max(50, "Maximum length of 50 characters."),
  company: Yup.string()
    .required("Company name is required.")
    .max(40, "Maximum length of 40 characters."),
  location: Yup.string()
    .required("Company location is required.")
    .max(30, "Maximum length of 30 characters."),
  category: Yup.string().required("Job category is required."),
  mode: Yup.string().required("Please specify job mode."),
  type: Yup.string().required("Please specify job type."),
  email: Yup.string().email("Invalid email format."),
});

export const blogFormValidationSchema = Yup.object({
  title: Yup.string()
    .required("Blog title is required.")
    .max(100, "Maximum length of 100 characters."),
  metaDescription: Yup.string()
    .required("Blog meta description is required.")
    .max(150, "Maximum length of 150 characters."),
  author: Yup.object().shape({
    name: Yup.string().required("Blog author is required."),
  }),
  image: Yup.string().required("Upload blog cover image."),
  category: Yup.string().required("Please select blog category."),
});

export const loginFormValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format.")
    .required("Enter your email."),
  password: Yup.string().required("Enter your password."),
});

export const signupFormValidationSchema = Yup.object({
  name: Yup.string()
    .required("Please enter your full name.")
    .matches(/^[A-Za-z\s]+$/, "Invalid characters in name."),
  email: Yup.string()
    .email("Please provide a valid email address.")
    .required("Email address is required."),
  password: Yup.string().required("Choose a password."),
});

export const forgotPasswordFormValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Enter the email associated with your account."),
});

export const resetPasswordFormValidationSchema = Yup.object({
  password: Yup.string()
    .required("Password field cannot be empty.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "At least 8 characters, a letter, a number and a special character."
    ),
});
