"use client";
import { BlogForm } from "@/components";
import { FormikErrors } from "formik";

const initialFormValues: BlogForm = {
  title: "",
  image: "",
  content: "",
  metaDescription: "",
  author: "",
  twitter: "",
  portfolio: "",
  linkedin: "",
};

const validate = (values: BlogForm) => {
  const errors: FormikErrors<BlogForm> = {};

  if (values.title.length > 40) {
    errors.title = "maximum length of 40";
  }

  if (values.metaDescription.length > 30) {
    errors.metaDescription = "maximum length of 30";
  }
};

const EditBlogInfo = () => {
  const previewBlog = () => {};

  return (
    <BlogForm
      initialFormValues={initialFormValues}
      title="Update Blog Info"
      validate={validate}
      submitForm={previewBlog}
    />
  );
};

export default EditBlogInfo;
