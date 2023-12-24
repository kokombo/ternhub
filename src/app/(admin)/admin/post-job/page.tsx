"use client";
import { JobForm } from "@/components";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
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
};

interface JobData extends JobFormType {
  description: string;
}

const PostAJob = () => {
  const [description, setDescription] = useState("");

  const router = useRouter();

  const queryClient = useQueryClient();

  const postAJobRequest = async (jobData: JobData) => {
    return await axios.post("/api/job", jobData);
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation(
    postAJobRequest,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchJobs");

        router.push("/admin/jobs");
      },
    }
  );

  console.log(error, isLoading, "isError", isError, "isSuccess", isSuccess);

  const postAJob = async (values: JobFormType) => {
    console.log(values);

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
      error={error}
      buttonLabel="Post Job"
    />
  );
};

export default PostAJob;
