"use client";

import { JobInfopageHeader, JobInfopageBody, Message } from "@/components";
import { RotatingLinesLoader } from "@/components/loaders/loaders";
import { RelatedJobs } from "..";
import { useSelector } from "react-redux";
import type { StateType } from "@/redux-toolkit/store";
import { illustrations } from "@/constants";
import { useGetJobById } from "@/utilities/data-fetching/getJobById";

type Props = {
  jobId: string | undefined;
};

const JobInfopage = ({ jobId }: Props) => {
  const { job, isLoading, isError, error, refetch } = useGetJobById(jobId);
  const { allJobs } = useSelector((state: StateType) => state.job);

  const relatedJobs = allJobs
    .filter((j) => j._id !== job?._id && j.category === job?.category)
    .slice(0, 4);

  if (isLoading) {
    return <RotatingLinesLoader />;
  }

  if (isError) {
    return (
      <div className="flex_center justify-center">
        <Message
          message={error?.response?.data?.message}
          isError={isError}
          onClickButton={refetch}
          buttonLabel="Try again"
          illustration={illustrations.error_2}
        />
      </div>
    );
  }

  return (
    <div className="singlejobpage_container ">
      <div className="jobinfo_wrapper">
        <JobInfopageHeader props={job} />
        <JobInfopageBody props={job} />
      </div>

      <RelatedJobs relatedJobs={relatedJobs} />
    </div>
  );
};

export default JobInfopage;
