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
    <>
      {/*  Rendering most recent blog post */}

      <section>
        {props.isLoading ? (
          <RecentBlogSkeletonLoader />
        ) : props.data && props.data.length > 0 ? (
          <div className="recent_blog_wrapper">
            <h2
              className="text-xl lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px] font-[500]"
              style={Grotesk.style}
            >
              Recent Post
            </h2>

            {props.data.slice(0, 1).map((blog) => (
              <RecentBlogCard key={blog._id} props={blog} />
            ))}
          </div>
        ) : null}
      </section>

      <section>
        {/* Rendering other blog posts*/}

        <>
          {props.isLoading ? (
            <div className="w-full blog_list_grid">
              {[...Array(8)].map((_, index) => (
                <BlogSkeletonLoader key={index} />
              ))}
            </div>
          ) : props.isError ? (
            <div className="flex items-center justify-center">
              <Message
                message={props.error?.response?.data?.message}
                isError={props.isError}
                buttonLabel="Try again"
                onClickButton={async () => await props.refetch()}
              />
            </div>
          ) : props.data && props.data.length === 0 ? (
            <div className="flex items-center justify-center">
              <Message message={props.noDataLabel} />
            </div>
          ) : props.data && props.data.length > 1 ? (
            <div>
              <h2
                className="text-xl lg:text-[28px] self-start text-textblack mb-[15px] lg:mb-[50px] font-[500]"
                style={Grotesk.style}
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
          <button className="bg-purple hover:bg-blue text-white rounded-[10px] font-semibold lg:text-base text-sm w-[140px] h-12 mt-[50px] self-center">
            Load more
          </button>
        ) : null}
      </section>
    </>
  );
};

export default BlogsList;
