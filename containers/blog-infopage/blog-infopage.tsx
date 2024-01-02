import { BlogInfopageHeader, BlogInfopageBody, Message } from "@/components";
import { illustrations } from "@/constants";
import RelatedBlogs from "../related-blogs/related-blogs";

import { getAllBlogs } from "@/utilities/data-fetching/getAllBlogs";

type Props = {
  data: BlogType | undefined;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  refetch?: any;
};

const BlogInfoPage = (props: Props) => {
  const { blogs } = getAllBlogs();

  const relatedBlogs = blogs
    ?.filter(
      (blog) =>
        blog._id !== props.data?._id && blog.category === props.data?.category
    )
    .slice(0, 4);

  return (
    <>
      {props.isLoading ? (
        <div className="min-h-screen"></div>
      ) : props.isError ? (
        <Message
          message={props.error?.response?.data?.message}
          isError={props.isError}
          onClickButton={async () => await props.refetch()}
          buttonLabel="Try again"
          illustration={illustrations.error_2}
        />
      ) : (
        <div className="py-6 lg:py-[60px] sm:px-[6.94%] px-5 flex_center lg:gap-[75px] gap-10">
          <BlogInfopageHeader props={props.data} />

          <BlogInfopageBody props={props.data} />

          <RelatedBlogs relatedBlogs={relatedBlogs} />
        </div>
      )}
    </>
  );
};

export default BlogInfoPage;
