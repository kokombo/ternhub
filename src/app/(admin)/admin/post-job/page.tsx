"use client";
import { JobForm } from "@/components";
import { useState } from "react";
import { useMutation } from "react-query";
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
};

interface JobData extends JobFormType {
  description: string;
}

const PostAJob = () => {
  const [description, setDescription] = useState("");

  const params = new URLSearchParams({
    key: process.env.PREVIEW_MODE_SECRET_TOKEN as string,
    redirect: "/admin/post-job/preview",
  });

  const router = useRouter();

  const previewJobRequest = async (jobData: JobData) => {
    return await axios.post(`/api/preview?${params}`, jobData);
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } =
    useMutation(previewJobRequest);

  const previewJob = async (values: JobFormType) => {
    const jobData = { ...values, description };

    await mutateAsync(jobData);

    if (isSuccess) {
      router.push("/admin/post-job/preview");
    }
  };

  return (
    <JobForm
      title="Post a Job"
      initialFormValues={initialFormValues}
      submitForm={previewJob}
      textEditorValue={description}
      textEditorOnchange={setDescription}
      isLoading={isLoading}
      isError={isError}
      error={error}
      buttonLabel="Preview Job"
    />
  );
};

export default PostAJob;
