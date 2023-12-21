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
        <div>
          <BlogInfopageHeader props={props.data} />

          <BlogInfopageBody props={props.data} />
        </div>
      )}
    </>
  );
};

export default BlogInfoPage;
