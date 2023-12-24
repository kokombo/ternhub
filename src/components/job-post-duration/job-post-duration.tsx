import { formatDistanceToNow } from "date-fns";

const JobPostDuration = ({ props }: { props: JobType }) => {
  const timeStamp = props.createdAt;

  let duration;

  const time = new Date(props.createdAt);

  if (timeStamp) {
    const timePeriod = formatDistanceToNow(time, { addSuffix: true });
    duration = timePeriod?.replace("about", "");
  }

  return (
    <p className="text-green text-sm lg:text-base tracking-[1%] ">
      Posted {duration}
    </p>
  );
};

export default JobPostDuration;
