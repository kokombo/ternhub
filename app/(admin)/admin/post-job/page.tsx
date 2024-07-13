"use client";
import { JobForm } from "@/components";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { type AxiosError } from "axios";
import { useRouter } from "next/navigation";

const initialFormValues: JobFormType = {
  title: "",
  company: "",
  location: "",
  category: "",
  site: "",
  mode: "",
  logo: "",
  salary: 0,
  email: "",
  slug: "",
  type: "",
};

const PostAJob = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const postAJobRequest = async (jobData: JobData) => {
    const res = await axios.post("/api/job", jobData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    JobData
  >(
    postAJobRequest,

    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchJobs");

        router.push("/admin/jobs");
      },
    }
  );

  const postAJob = async (values: JobFormType) => {
    const jobData = { ...values, description };

    await mutateAsync(jobData);
  };

  return (
    <JobForm
      title="Post a Job"
      initialFormValues={initialFormValues}
      submitForm={postAJob}
      textEditorValue={description}
      textEditorOnchange={setDescription}
      isLoading={isLoading}
      isError={isError}
      error={error?.response?.data.message}
      buttonLabel="Post Job"
    />
  );
};

export default PostAJob;
