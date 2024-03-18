"use client";

import { JobForm, Message } from "@/components";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetJobById } from "@/utilities/data-fetching/getJobById";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { illustrations } from "@/constants";

const EditJobInfo = () => {
  const searchParams = useSearchParams();

  const jobId = searchParams.get("listing_id");

  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    job,
    isError: isJobByIdError,
    isLoading: isJobByIdLoading,
    refetch: refetchJobById,
    error: jobByIdError,
  } = useGetJobById(jobId);

  const initialFormValues: JobFormType = {
    title: job?.title !== undefined ? job?.title : "",
    company: job?.company !== undefined ? job?.company : "",
    location: job?.location !== undefined ? job?.location : "",
    category: job?.category !== undefined ? job?.category : "",
    site: job?.site !== undefined ? job?.site : "",
    mode: job?.mode !== undefined ? job?.mode : "",
    logo: job?.logo !== undefined ? job?.logo : "",
    salary: job?.salary !== undefined ? job?.salary : 0,
    slug: job?.slug !== undefined ? job?.slug : "",
    type: job?.type !== undefined ? job?.type : "",
  };

  const [description, setDescription] = useState(job?.description || "");

  const updateJobRequest = async (newJobData: JobData) => {
    const res = await axios.patch(`/api/job/${jobId}`, newJobData);
    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    JobData
  >(
    "updateJob",

    updateJobRequest,

    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchJobs");

        router.push("/admin/jobs");
      },
    }
  );

  const updateJob = async (values: JobFormType) => {
    const newJobData = { ...values, description };

    await mutateAsync(newJobData);
  };

  return (
    <div>
      {isJobByIdLoading ? (
        <div className="h-screen"></div>
      ) : isJobByIdError ? (
        <div className="flex_center w-full">
          <Message
            message={jobByIdError?.response?.data?.message}
            isError={isJobByIdError}
            buttonLabel="Try again"
            onClickButton={async () => await refetchJobById()}
            illustration={illustrations.error_2}
          />
        </div>
      ) : (
        <JobForm
          initialFormValues={initialFormValues}
          title="Update Job Info"
          submitForm={updateJob}
          textEditorValue={description}
          textEditorOnchange={setDescription}
          isLoading={isLoading}
          isError={isError}
          error={error}
          buttonLabel="Update Job"
        />
      )}
    </div>
  );
};

export default EditJobInfo;
