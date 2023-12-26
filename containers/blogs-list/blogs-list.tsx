import { RecentBlogCard, BlogCard, Search, Message } from "@/components";
import BlogSkeletonLoader from "@/utilities/skeletons/blog-skeleton-loader";
import RecentBlogSkeletonLoader from "@/utilities/skeletons/recent-blog-skeleton-loader";
import { Grotesk } from "@/app/font";

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
      {/*  Rendering most recent blog post */}

      <section
        className={`${
          props.data && props.data.length > 0 ? "recent_blog_wrapper" : ""
        }`}
      >
        {props.data && props.data.length > 0 ? (
          <h2
            className="lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px] font-[500px]"
            style={Grotesk.style}
          >
            Recent Post
          </h2>
        ) : null}

        <div>
          {props.isLoading ? (
            <RecentBlogSkeletonLoader />
          ) : props.data && props.data.length > 0 ? (
            props.data
              .slice(0, 1)
              .map((blog) => <RecentBlogCard key={blog._id} props={blog} />)
          ) : null}
        </div>
      </section>

      {/* Rendering other blog posts*/}

      <section>
        {props.data && props.data.length > 1 ? (
          <h2
            className="lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px] font-[500]"
            style={Grotesk.style}
          >
            Must Read Blogs
          </h2>
        ) : null}

        <div
          className={`w-full ${
            (props.data && props.data.length > 1) || props.isLoading
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
          ) : props.data && props.data.length === 0 ? (
            <Message message={props.noDataLabel} />
          ) : props.data && props.data.length > 1 ? (
            props.data
              .slice(1, 11)
              .map((blog) => (
                <BlogCard key={blog._id} props={blog} rootUrl={props.rootUrl} />
              ))
          ) : null}
        </div>

        {/* Rendering infinite load more button  */}

        {props.data && props.data.length > 9 ? (
          <button className="bg-purple hover:bg-blue text-white rounded-[10px] font-semibold lg:text-base text-sm w-[140px] h-12 mt-[50px] self-center">
            Load more
          </button>
        ) : null}
      </section>
    </div>
  );
};

export default BlogsList;