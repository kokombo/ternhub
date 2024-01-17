import { JobCard, Message } from "@/components";
import { illustrations } from "@/constants";
import JobSkeletonLoader from "@/utilities/skeletons/job-skeleton-loader";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

type Props = {
  data: JobType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  noDataLabel: string;
  refetch?: any;
  rootUrl: string;
  isFetching: boolean;
  isPreviousData: boolean;
  pageNumber: number;
  limit: number;
  resultsCountPerQuery: number;
  totalJobs: number;
  noDataIllustration: string | StaticImport;
  onClickNextButton: () => void;
  onClickPrevButton: () => void;
};

const JobsList = (props: Props) => {
  return (
    <section className="flex flex-col items-center justify-between min-h-screen ">
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
            illustration={illustrations.error_2}
          />
        </div>
      ) : props.data && props.data.length < 1 ? (
        <div className="flex_center w-full">
          <Message
            message={props.noDataLabel}
            illustration={props.noDataIllustration}
          />
        </div>
      ) : (
        <div className="job_list_grid w-full ">
          {props.data?.map((job) => (
            <JobCard props={job} key={job._id} rootUrl={props.rootUrl} />
          ))}
        </div>
      )}

      {/*  Rendering pagination buttons */}

      <div className="flex items-center justify-center gap-4 mt-10 lg:mt-14">
        {props?.pageNumber <= 1 ? null : (
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });

              props.onClickPrevButton();
            }}
          >
            <FaChevronCircleLeft size={20} color={"#5627FF"} />
          </button>
        )}

        {props.data && props.data.length > 0 ? (
          <span className="font-semibold text-base ">
            Page {props?.pageNumber}
          </span>
        ) : null}

        {!props.isPreviousData && props.resultsCountPerQuery === props.limit ? (
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });

              props.onClickNextButton();
            }}
            className=""
          >
            <FaChevronCircleRight size={20} color={"#5627FF"} />
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default JobsList;
