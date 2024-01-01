import {
  JobInfopageHeader,
  JobInfopageBody,
  Message,
  Loader,
  RotatingSquareLoader,
  RotatingLinesLoader,
  ColorRingLoader,
} from "@/components";
import { RelatedJobs } from "..";
import { useSelector } from "react-redux";
import { StateType } from "@/redux-toolkit/store";
import { illustrations } from "@/constants";

type Props = {
  data: JobType | undefined;
  isError?: boolean;
  isLoading?: boolean;
  error?: any;
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
        <div className="min-h-screen"></div>
      ) : props.isError ? (
        <div className="flex_center justify-center">
          <Message
            message={props.error?.response?.data?.message}
            isError={props.isError}
            onClickButton={async () => await props.refetch()}
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
