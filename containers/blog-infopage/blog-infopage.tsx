import { BlogInfopageHeader, BlogInfopageBody, Message } from "@/components";

type Props = {
  data: BlogType | undefined;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  refetch?: any;
};

const BlogInfoPage = (props: Props) => {
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
        />
      ) : (
        <div className="py-11 lg:py-[100px] sm:px-[6.94%] px-5 flex_center ">
          <BlogInfopageHeader props={props.data} />

          <BlogInfopageBody props={props.data} />
        </div>
      )}
    </>
  );
};

export default BlogInfoPage;
