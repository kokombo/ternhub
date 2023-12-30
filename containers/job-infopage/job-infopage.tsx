import {
  JobInfopageHeader,
  JobInfopageBody,
  Message,
  Loader,
} from "@/components";
import { RelatedJobs } from "..";
import { useSelector } from "react-redux";
import { StateType } from "@/redux-toolkit/store";

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
    .filter((job) => job.category === props.data?.category)
    .slice(0, 4);

  return (
    <>
      {props.isLoading ? (
        <div className="flex_center justify-center">
          <Loader />
        </div>
      ) : props.isError ? (
        <div className="flex_center justify-center">
          <Message
            message={props.error?.response?.data?.message}
            isError={props.isError}
            onClickButton={async () => await props.refetch()}
            buttonLabel="Try again"
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
