"use client";
import { SectionHeading, StyledLink } from "@/components";
import { useQuery } from "react-query";
import axios from "axios";
import { JobsList } from "..";
import { useSession } from "next-auth/react";

const TrendingJobs = () => {
  const { data: session } = useSession();

  const fetchJobsRequest = async (): Promise<JobType[] | undefined> => {
    return await axios.get("/api/job");
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "fetchJobs",
    fetchJobsRequest,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <section className="container">
      <SectionHeading
        heading="Trending Jobs"
        subheading="Explore latest tech internships and job opportunities"
      />

      <JobsList
        data={data?.slice(0, 20)}
        isLoading={isLoading}
        isError={isError}
        error={error}
        noDataLabel=""
        refetch={refetch}
        rootUrl="/jobs"
      />

      <StyledLink
        label="See More Jobs"
        arialabel="Link to navigate to all jobs page from the landingpage"
        url={`${session?.user ? "/jobs" : "/auth/signin"}`}
        extraClasses="self-center"
      />
    </section>
  );
};

export default TrendingJobs;
