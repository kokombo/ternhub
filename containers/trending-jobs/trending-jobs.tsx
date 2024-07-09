import { SectionHeading, StyledLink, JobCard } from "@/components";
import { useQuery } from "react-query";
import axios, { type AxiosError } from "axios";
import JobSkeletonLoader from "@/utilities/skeletons/job-skeleton-loader";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useId } from "react";

type Data = {
  jobs: JobType[];
  numOfJobs: number;
};

const TrendingJobs = () => {
  const { data: session } = useSession();
  const id = useId();

  const fetchTrendingJobsRequest = async () => {
    const res = await axios.get("/api/jobs");
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    Data,
    AxiosError<ErrorResponse>
  >("fetchTrendingJobs", fetchTrendingJobsRequest, {
    refetchOnWindowFocus: false,

    staleTime: 60 * 60 * 1000,
  });

  return (
    <section className="container">
      <SectionHeading
        heading="Trending Jobs"
        subheading="Explore latest tech internships and job opportunities."
      />

      <div className="landing_page_internships_container ">
        {isLoading || isError
          ? [...Array(10)].map((_, index) => <JobSkeletonLoader key={id} />)
          : data?.jobs &&
            data.jobs.length > 1 &&
            data.jobs
              .slice(0, 30)
              .map((job) => (
                <JobCard props={job} key={job._id} rootUrl={"/jobs"} />
              ))}
      </div>

      <StyledLink
        label="See more jobs"
        arialabel="Link to navigate to all jobs page from the landing page."
        url={`${session?.user ? "/jobs" : "/auth/signin"}`}
        onClick={() =>
          session?.user
            ? undefined
            : toast.error("Please sign in to continue using TernHub.", {
                position: "top-right",
              })
        }
        extraClasses="self-center blue_button"
        prefetch={true}
      />
    </section>
  );
};

export default TrendingJobs;
