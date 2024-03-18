import {
  JobInfopageHeader,
  JobInfopageBody,
  Message,
  RotatingLinesLoader,
} from "@/components";
import { RelatedJobs } from "..";
import { useSelector } from "react-redux";
import { StateType } from "@/redux-toolkit/store";
import { illustrations } from "@/constants";
import { AxiosError } from "axios";

type Props = {
  data: JobType | undefined;
  isError: boolean;
  isLoading: boolean;
  error: AxiosError<ErrorResponse> | null;
  refetch?: any;
};

const JobInfopage = (props: Props) => {
  const { allJobs } = useSelector((state: StateType) => state.job);

  const relatedJobs = allJobs
    .filter(
      (job) =>
        job._id !== props.data?._id && job.category === props.data?.category
    )
    .slice(0, 4);

  return (
    <>
      {props.isLoading ? (
        <RotatingLinesLoader />
      ) : props.isError ? (
        <div className="flex_center justify-center">
          <Message
            message={props.error?.response?.data?.message}
            isError={props.isError}
            onClickButton={props.refetch}
            buttonLabel="Try again"
            illustration={illustrations.error_2}
          />
        </div>
      ) : (
        <div className="singlejobpage_container ">
          <div className="jobinfo_wrapper">
            <JobInfopageHeader props={props.data} />

            <JobInfopageBody props={props.data} />
          </div>

          <RelatedJobs relatedJobs={relatedJobs} />
        </div>
      )}
    </>
  );
};

export default JobInfopage;
