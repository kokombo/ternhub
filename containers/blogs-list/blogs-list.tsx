import { RecentBlogCard, BlogCard, Search, Message } from "@/components";
import BlogSkeletonLoader from "@/utilities/skeletons/blog-skeleton-loader";
import RecentBlogSkeletonLoader from "@/utilities/skeletons/recent-blog-skeleton-loader";
import { GroteskBold } from "@/app/font";
import { illustrations } from "@/constants";
import type { AxiosError } from "axios";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

type Props = {
  data: BlogType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<ErrorResponse> | null;
  noDataLabel: string;
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<BlogType[], AxiosError<ErrorResponse>>>;
  rootUrl: string;
};

const BlogsList = (props: Props) => {
  return (
    <>
      {/*  Rendering most recent blog post */}

      <section>
        {props.isLoading ? (
          <RecentBlogSkeletonLoader />
        ) : props.data && props.data.length > 0 ? (
          <div className="recent_blog_wrapper">
            <h2
              className="text-xl lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px] font-[500]"
              style={GroteskBold.style}
            >
              Recent Post
            </h2>

            {props.data.slice(0, 1).map((blog) => {
              return (
                <RecentBlogCard
                  key={blog._id}
                  props={blog}
                  rootUrl={props.rootUrl}
                />
              );
            })}
          </div>
        ) : null}
      </section>

      <section>
        {/* Rendering other blog posts*/}

        <>
          {props.isLoading ? (
            <div className="w-full blog_list_grid">
              {[...Array(8)].map((_, index) => (
                <BlogSkeletonLoader key={index.toString()} />
              ))}
            </div>
          ) : props.isError ? (
            <div className="flex items-center justify-center">
              <Message
                message={props.error?.response?.data?.message}
                isError={props.isError}
                buttonLabel="Try again"
                onClickButton={props.refetch}
                illustration={illustrations.error_2}
              />
            </div>
          ) : props.data && props.data.length === 0 ? (
            <div className="flex items-center justify-center">
              <Message
                message={props.noDataLabel}
                illustration={illustrations.no_saved_jobs}
              />
            </div>
          ) : props.data && props.data.length > 1 ? (
            <div>
              <h2
                className="text-xl lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px] font-[500]"
                style={GroteskBold.style}
              >
                Must Read Blogs
              </h2>
              <div className="w-full blog_list_grid">
                {props.data.slice(1, 11).map((blog) => (
                  <BlogCard
                    key={blog._id}
                    props={blog}
                    rootUrl={props.rootUrl}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </>

        {/* Rendering infinite load more button  */}

        {props.data && props.data.length > 9 ? (
          <button
            type="button"
            className="bg-purple hover:bg-blue text-white rounded-[10px] font-semibold lg:text-base text-sm w-[140px] h-12 mt-[50px] self-center"
          >
            Load more
          </button>
        ) : null}
      </section>
    </>
  );
};

export default BlogsList;
