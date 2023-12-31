"use client";

import { JobForm, Message } from "@/components";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useParams } from "next/navigation";
import { getJobById } from "@/utilities/data-fetching/getJobById";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { illustrations } from "@/constants";

const EditJobInfo = () => {
  const { jobId } = useParams();

  const router = useRouter();

  const queryClient = useQueryClient();

  let jobByIdErrorRes: any;

  const {
    job,
    isError: isJobByIdError,
    isLoading: isJobByIdLoading,
    refetch: refetchJobById,
    error: jobByIdError,
  } = getJobById(jobId);

  if (isJobByIdError) jobByIdErrorRes = jobByIdError;

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

  const updateJobRequest = async (newJobData: JobData) => {
    return await axios.patch(`/api/job/${jobId}`, newJobData);
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(
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
            message={jobByIdErrorRes?.response?.data?.message}
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
