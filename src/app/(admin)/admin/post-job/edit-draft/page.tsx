"use client";
import { JobForm } from "@/components";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface JobData extends JobFormType {
  description: string;
}

const EditJobAfterPreview = ({ props }: { props: JobData }) => {
  const initialFormValues: JobFormType = {
    title: props.title,
    company: props.company,
    location: props.location,
    category: props.category,
    site: props.site,
    mode: props.mode,
    logo: props.logo,
    salary: props.salary,
  };

  const [description, setDescription] = useState(props.description);

  const router = useRouter();

  const previewJobAfterEditRequest = async (jobData: JobData) => {
    return await axios.post(
      "api/preview?redirect=/admin/post-job/preview",
      jobData
    );
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation(
    previewJobAfterEditRequest
  );

  const previewJobAfterEdit = async (values: JobFormType) => {
    const jobData = { ...values, description };

    await mutateAsync(jobData);

    if (isSuccess) {
      router.push("/admin/post-job/preview");
    }
  };

  return (
    <JobForm
      title="Edit Job Draft"
      initialFormValues={initialFormValues}
      submitForm={previewJobAfterEdit}
      textEditorValue={description}
      textEditorOnchange={setDescription}
      isLoading={isLoading}
      isError={isError}
      error={error}
      buttonLabel="Preview Job"
    />
  );
};

export default EditJobAfterPreview;
