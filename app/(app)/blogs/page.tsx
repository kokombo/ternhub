"use client";
import axios from "axios";
import { useQuery } from "react-query";
import { BlogsList } from "../../../containers";
import { BlogsListpageTitle, Search } from "../../../components";

const BlogListPage = () => {
  const fetchBlogsRequest = async (): Promise<BlogType[] | undefined> => {
    const res = await axios.get("/api/blog");
    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "fetchBlogs",

    fetchBlogsRequest,

    {
      refetchOnWindowFocus: false,

      staleTime: 60 * 60 * 1000,
    }
  );

  console.log(isError, isLoading, data, error);

  return (
    <div className="flex flex-col py-11 lg:py-[100px] sm:px-[6.94%] px-5 w-full">
      <section className="blog_list_header_wrapper">
        <BlogsListpageTitle />

        <Search
          buttonLabel="Search blog"
          placeholder="Search blog topic"
          onChange={() => {}}
          value=""
          onClickSearchButton={() => {}}
        />
      </section>

      <BlogsList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
        noDataLabel="There are no available blogs at this time. Please check back."
        rootUrl="/blogs"
      />
    </div>
  );
};

export default BlogListPage;
