import { JobCard, Message } from "@/components";
import JobSkeletonLoader from "@/utilities/skeletons/job-skeleton-loader";
import { InfiniteData } from "react-query";

type Props = {
  data: JobType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  noDataLabel: string;
  refetch?: any;
  rootUrl: string;
};

const JobsList = (props: Props) => {
  return (
    <section
      className={`w-full ${
        (props.data && props.data.length > 0) || props.isLoading
          ? "job_list_grid"
          : "flex items-center justify-center"
      } `}
    >
      {props.isLoading ? (
        [...Array(10)].map((_, index) => <JobSkeletonLoader key={index} />)
      ) : props.isError ? (
        <Message
          message={props.error?.response?.data?.message}
          isError={props.isError}
          buttonLabel="Try again"
          onClickButton={async () => await props.refetch()}
        />
      ) : props.data && props.data.length < 1 ? (
        <div className="flex items-center justify-center h-48">
          <Message message={props.noDataLabel} />
        </div>
      ) : (
        props.data &&
        props.data.map((job) => (
          <JobCard props={job} key={job.id} rootUrl={props.rootUrl} />
        ))
      )}
    </section>
  );
};

export default JobsList;
