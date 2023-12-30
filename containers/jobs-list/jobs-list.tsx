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
    <section className="flex flex-col items-center justify-between min-h-screen  ">
      {props.isLoading || props.isFetching ? (
        <div className="job_list_grid w-full">
          {[...Array(10)].map((_, index) => (
            <JobSkeletonLoader key={index} />
          ))}
        </div>
      ) : props.isError ? (
        <div className="flex_center w-full">
          <Message
            message={props.error?.response?.data?.message}
            isError={props.isError}
            buttonLabel="Try again"
            onClickButton={async () => await props.refetch()}
          />
        </div>
      ) : props.data && props.data.length < 1 ? (
        <div className="flex_center w-full">
          <Message message={props.noDataLabel} />
        </div>
      ) : (
        <div className="job_list_grid w-full ">
          {props.data?.map((job) => (
            <JobCard props={job} key={job._id} rootUrl={props.rootUrl} />
          ))}
        </div>
      )}

      {/*  Rendering pagination buttons */}

      <div className="flex items-center gap-4 mt-10 lg:mt-14">
        {props?.pageNumber <= 1 ? null : (
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });

              props.setPageNumber((prev) => Math.max(prev - 1, 1));
            }}
          >
            Prev
          </button>
        )}

        {props.data && props.data.length > 0 ? (
          <span className="font-semibold text-base ">
            Page: {props?.pageNumber}
          </span>
        ) : null}

        {!props.isPreviousData &&
        Math.round(props.pageNumber * props.limit) <= props.totalCount ? (
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });

              props.setPageNumber((prev) => prev + 1);
            }}
            className=""
          >
            <a>Next</a>
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default JobsList;
