"use client";

import { JobForm } from "@/components";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useParams } from "next/navigation";
import { getJobById } from "@/utilities/data-fetching/getJobById";

const EditJobInfo = () => {
  const { jobId } = useParams();

  const { job } = getJobById(jobId);

  const initialFormValues: JobFormType = {
    title: job?.title as string,
    company: job?.company as string,
    location: job?.location as string,
    category: job?.category as string,
    site: job?.site as string,
    mode: job?.mode as string,
    logo: job?.logo as string,
    salary: job?.salary as number,
    slug: job?.slug as string,
    type: job?.type as string,
  };

  const [description, setDescription] = useState(job?.description as string);

  const updateJob = async (
    values: JobFormType,
    onSubmitProps: FormikHelpers<JobFormType>
  ) => {};

  return (
    <JobForm
      initialFormValues={initialFormValues}
      title="Update Job Info"
      submitForm={updateJob}
      textEditorValue={description}
      textEditorOnchange={setDescription}
      isLoading={false}
      isError={false}
      error={"AA"}
      buttonLabel="Preview Update"
    />
  );
};

export default EditJobInfo;
