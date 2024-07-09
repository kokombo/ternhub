import {
  JobInfopageHeader,
  JobInfopageBody,
  Message,
  RotatingLinesLoader,
} from "@/components";
import { RelatedJobs } from "..";
import { useSelector } from "react-redux";
import type { StateType } from "@/redux-toolkit/store";
import { illustrations } from "@/constants";
import type { AxiosError } from "axios";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

type Props = {
  data: JobType | undefined;
  isError: boolean;
  isLoading: boolean;
  error: AxiosError<ErrorResponse> | null;
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<JobType, AxiosError<ErrorResponse>>>;
};

const JobInfopage = (props: Props) => {
  const { allJobs } = useSelector((state: StateType) => state.job);

  const relatedJobs = allJobs
    .filter(
      (job) =>
        job._id !== props.data?._id && job.category === props.data?.category
    )
    .slice(0, 4);

  if (props.isLoading) {
    return <RotatingLinesLoader />;
  }

  if (props.isError) {
    return (
      <div className="flex_center justify-center">
        <Message
          message={props.error?.response?.data?.message}
          isError={props.isError}
          onClickButton={props.refetch}
          buttonLabel="Try again"
          illustration={illustrations.error_2}
        />
      </div>
    );
  }

  return (
    <div className="singlejobpage_container ">
      <div className="jobinfo_wrapper">
        <JobInfopageHeader props={props.data} />

        <JobInfopageBody props={props.data} />
      </div>

      <RelatedJobs relatedJobs={relatedJobs} />
    </div>
  );
};

export default JobInfopage;
