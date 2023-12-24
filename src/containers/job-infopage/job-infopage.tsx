import {
  JobInfopageHeader,
  JobInfopageBody,
  Message,
  Loader,
} from "@/components";

type Props = {
  data: JobType | undefined;
  isError?: boolean;
  isLoading?: boolean;
  error?: any;
  refetch?: any;
};

const JobInfopage = (props: Props) => {
  return (
    <div
      className={`${
        props.isError && props.isLoading ? "flex_center justify-center" : ""
      }`}
    >
      {props.isLoading ? (
        <Loader />
      ) : props.isError ? (
        <Message
          message={props.error?.response?.data?.message}
          isError={props.isError}
          onClickButton={async () => await props.refetch()}
          buttonLabel="Try again"
        />
      ) : (
        <div className="singlejobpage_container ">
          <div className="jobinfo_wrapper">
            <JobInfopageHeader props={props.data} />

            <JobInfopageBody props={props.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInfopage;
