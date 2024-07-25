import * as Yup from "yup";

export const jobFormValidationSchema = Yup.object({
  title: Yup.string()
    .required("Job title is required.")
    .max(50, "Maximum length of 50 characters.")
    .matches(/^\S(.*\S)?$/, "Job title is required"),
  company: Yup.string()
    .required("Company name is required.")
    .max(40, "Maximum length of 40 characters.")
    .matches(/^\S(.*\S)?$/, "Company name is required"),
  location: Yup.string()
    .required("Company location is required.")
    .max(30, "Maximum length of 30 characters.")
    .matches(/^\S(.*\S)?$/, "Company location is required"),
  category: Yup.string().required("Job category is required."),
  mode: Yup.string().required("Please specify job mode."),
  type: Yup.string().required("Please specify job type."),
  email: Yup.string().email("Invalid email format."),
});

export const blogFormValidationSchema = Yup.object({
  title: Yup.string()
    .required("Blog title is required.")
    .max(100, "Maximum length of 100 characters.")
    .matches(/^\S(.*\S)?$/, "Blog title is required"),
  metaDescription: Yup.string()
    .required("Blog meta description is required.")
    .max(150, "Maximum length of 150 characters.")
    .matches(/^\S(.*\S)?$/, "Blog meta description is required"),
  author: Yup.object().shape({
    name: Yup.string()
      .required("Blog author is required.")
      .matches(/^\S(.*\S)?$/, "Blog author is required"),
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
    .matches(/^[A-Za-z\s]+$/, "Invalid characters in name.")
    .matches(/^\S(.*\S)?$/, "Please enter a valid name"),
  email: Yup.string()
    .email("Please provide a valid email address.")
    .required("Email address is required."),
  password: Yup.string()
    .required("Choose a password.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "At least 8 characters, a letter, a number and a special character."
    ),
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
