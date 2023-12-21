import { JobInfopageHeader, JobInfopageBody, Message } from "@/components";

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
        <div className="min-h-screen"></div>
      ) : props.isError ? (
        <Message
          message={props.error?.response?.data?.message}
          isError={props.isError}
          onClickButton={async () => await props.refetch()}
          buttonLabel="Try again"
        />
      ) : (
        <div>
          <JobInfopageHeader props={props.data} />

          <JobInfopageBody props={props.data} />
        </div>
      )}
    </>
  );
};

export default JobInfopage;
