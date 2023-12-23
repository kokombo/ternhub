"use client";
import { JobForm } from "@/components";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";

const EditJobInfo = () => {
  const { jobId } = useParams();

  const getJobByIdRequest = async (): Promise<JobType | undefined> => {
    const res = await axios.get(`/api/job/${jobId}`);
    return res.data;
  };

  const { data: job } = useQuery("getJobById", getJobByIdRequest, {
    refetchOnWindowFocus: false,
  });

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
  };

  const [description, setDescription] = useState(job?.description as string);

  const updateJob = async (
    values: JobFormType,
    onSubmitProps: FormikHelpers<JobFormType>
  ) => {};

  //If user role is not admin, redirect user to the app segment home

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
