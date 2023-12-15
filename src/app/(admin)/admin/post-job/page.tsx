"use client";
import { JobForm } from "@/components";
import { FormikErrors } from "formik";

const initialFormValues: JobForm = {
  title: "",
  company: "",
  location: "",
  description: "",
  category: "",
  site: "",
  mode: "",
  logo: "",
};

const validate = (values: JobForm) => {
  const errors: FormikErrors<JobForm> = {};

  if (values.title.length > 40) {
    errors.title = "maximum length of 40";
  }

  if (values.company.length > 30) {
    errors.company = "maximum length of 30";
  }

  if (values.location.length > 25) {
    errors.location = "maximum length of 25";
  }
};

const PostAJob = () => {
  const postJob = () => {};

  return (
    <JobForm
      initialFormValues={initialFormValues}
      title="Post a Job"
      validate={validate}
      submitForm={postJob}
    />
  );
};

export default PostAJob;
