import { readingTime } from "reading-time-estimator";

const BlogReadTime = ({
  props,
  className,
}: {
  props: BlogType;
  className: string;
}) => {
  const result = readingTime(props.content);

  return <p className={`text-lightGrey ${className} `}> {result.text}</p>;
};

export default BlogReadTime;
