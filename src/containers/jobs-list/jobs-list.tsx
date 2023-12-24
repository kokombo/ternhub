import { JobCard, Message } from "@/components";
import JobSkeletonLoader from "@/utilities/skeletons/job-skeleton-loader";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: JobType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  noDataLabel: string;
  refetch?: any;
  rootUrl: string;
  isFetching: boolean;
  setPageNumber: Dispatch<SetStateAction<number>>;
  isPreviousData: boolean;
  pageNumber: number;
  limit: number;
  totalCount: number;
};

const JobsList = (props: Props) => {
  return (
    <section className="flex flex-col items-center gap-8 w-full">
      {/* Rendering jobs list*/}

      <div
        className={`w-full ${
          (props.data && props.data.length > 0) || props.isLoading
            ? "job_list_grid"
            : "flex items-center justify-center"
        } `}
      >
        {props.isLoading || props.isFetching ? (
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
          props.data?.map((job) => (
            <JobCard props={job} key={job._id} rootUrl={props.rootUrl} />
          ))
        )}
      </div>

      {/*  Rendering pagination buttons */}

      {props.data && props.data.length > props.limit ? (
        <div className="flex items-center gap-2">
          {props?.pageNumber <= 1 ? null : (
            <button
              type="button"
              onClick={() =>
                props.setPageNumber((prev) => Math.max(prev - 1, 1))
              }
            >
              Prev
            </button>
          )}

          <span>Page: {props?.pageNumber}</span>

          {!props.isPreviousData &&
          Math.round(props.pageNumber * props.limit) <= props.totalCount ? (
            <button
              type="button"
              onClick={() => props.setPageNumber((prev) => prev + 1)}
            >
              Next
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default JobsList;
