import { readingTime } from "reading-time-estimator";

const BlogReadTime = ({
  props: blog,
  className,
}: {
  props: BlogType;
  className: string;
}) => {
  const result = readingTime(blog?.content);

  return (
    <p className={`text-lightGrey ${className} `}>
      {" "}
      {result.text.replace("less than", "")}
    </p>
  );
};

export default BlogReadTime;
