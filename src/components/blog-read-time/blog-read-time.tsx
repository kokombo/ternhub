const BlogReadTime = ({
  props,
  className,
}: {
  props: BlogType;
  className: string;
}) => {
  //read-time-estimator
  // const result = readingTime(props.content);

  //{result.text}
  return <p className={`text-lightGrey ${className} `}> </p>;
};

export default BlogReadTime;
