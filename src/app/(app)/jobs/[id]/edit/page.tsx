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
  } else if (values.company.length > 30) {
    errors.title = "maximum length of 30";
  } else if (values.location.length > 25) {
    errors.title = "maximum length of 25";
  } else {
    errors.title = "";
  }
};

const EditJobInfo = () => {
  const updateJob = () => {};

  return (
    <JobForm
      initialFormValues={initialFormValues}
      title="Update Job Info"
      validate={validate}
      submitForm={updateJob}
    />
  );
};

export default EditJobInfo;
