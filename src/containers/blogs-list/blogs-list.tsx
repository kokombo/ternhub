import {
  BlogsListpageTitle,
  RecentBlogCard,
  BlogCard,
  Search,
  Message,
} from "@/components";
import BlogSkeletonLoader from "@/utilities/skeletons/blog-skeleton-loader";
import RecentBlogSkeletonLoader from "@/utilities/skeletons/recent-blog-skeleton-loader";

type Props = {
  data: BlogType[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  noDataLabel: string;
  refetch?: any;
  rootUrl: string;
};

const BlogsList = (props: Props) => {
  return (
    <div>
      <section className={`${props.data ? "recent_blog_wrapper" : ""}`}>
        {props.data && (
          <h2 className="lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px]">
            Recent Post
          </h2>
        )}

        <div>
          {props.isLoading ? (
            <RecentBlogSkeletonLoader />
          ) : (
            props.data &&
            props.data
              .slice(0, 1)
              .map((blog) => <RecentBlogCard key={blog.id} props={blog} />)
          )}
        </div>
      </section>

      <section>
        {props.data && props.data.length > 1 ? (
          <h2 className="lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px]">
            Must Read Blogs
          </h2>
        ) : null}

        <div
          className={`w-full ${
            (props.data && props.data.length > 0) || props.isLoading
              ? "blog_list_grid"
              : "flex items-center justify-center"
          } `}
        >
          {props.isLoading ? (
            [...Array(8)].map((_, index) => <BlogSkeletonLoader key={index} />)
          ) : props.isError ? (
            <Message
              message={props.error?.response?.data?.message}
              isError={props.isError}
              buttonLabel="Try again"
              onClickButton={async () => await props.refetch()}
            />
          ) : props.data && props.data.length < 1 ? (
            <Message message={props.noDataLabel} />
          ) : (
            props.data &&
            props.data
              .slice(1, 11)
              .map((blog) => (
                <BlogCard key={blog.id} props={blog} rootUrl={props.rootUrl} />
              ))
          )}
        </div>

        {props.data && props.data.length > 11 ? (
          <button className="bg-purple hover:bg-blue text-white rounded-[10px] font-semibold lg:text-base text-sm w-[140px] h-12 mt-[50px] self-center">
            Load more
          </button>
        ) : null}
      </section>
    </div>
  );
};

export default BlogsList;
