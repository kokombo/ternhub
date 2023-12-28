import {
  JobInfopageHeader,
  JobInfopageBody,
  Message,
  Loader,
} from "@/components";
import { RelatedJobs } from "..";

type Props = {
  data: JobType | undefined;
  isError?: boolean;
  isLoading?: boolean;
  error?: any;
  refetch?: any;
};

const JobInfopage = (props: Props) => {
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

          {/* <RelatedJobs/> */}
        </div>
      )}
    </>
  );
};

export default JobInfopage;
