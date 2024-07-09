import { BlogInfopageHeader, BlogInfopageBody, Message } from "@/components";
import { illustrations } from "@/constants";
import RelatedBlogs from "../related-blogs/related-blogs";
import type { AxiosError } from "axios";
import { useGetAllBlogs } from "@/utilities/data-fetching/getAllBlogs";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

type Props = {
  data: BlogType | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<ErrorResponse> | null;
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<BlogType, AxiosError<ErrorResponse>>>;
  rootUrl: string;
};

const BlogInfoPage = (props: Props) => {
  const { blogs } = useGetAllBlogs();

  const relatedBlogs = blogs
    ?.filter(
      (blog) =>
        blog._id !== props.data?._id && blog.category === props.data?.category
    )
    .slice(0, 4);

  return (
    <>
      {props.isLoading ? (
        <div className="min-h-screen" />
      ) : props.isError ? (
        <div className="flex_center">
          <Message
            message={props.error?.response?.data?.message}
            isError={props.isError}
            onClickButton={props.refetch}
            buttonLabel="Try again"
            illustration={illustrations.error_2}
          />
        </div>
      ) : (
        <div className="py-6 lg:py-[60px] sm:px-[6.94%] px-5 flex_center lg:gap-[75px] gap-10">
          <BlogInfopageHeader props={props.data} />

          <BlogInfopageBody props={props.data} />

          <RelatedBlogs relatedBlogs={relatedBlogs} rootUrl={props.rootUrl} />
        </div>
      )}
    </>
  );
};

export default BlogInfoPage;
