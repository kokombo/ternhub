import { formatDistanceToNow } from "date-fns";

const JobPostDuration = ({ props }: { props: JobType }) => {
  const timeStamp = props.timeStamp;

  let duration;

  const date = timeStamp;

  if (timeStamp) {
    const timePeriod = formatDistanceToNow(date);
    duration = timePeriod?.replace("about", "");
  }

  return (
    <p className="text-green text-sm lg:text-base tracking-[1%] ">
      Posted {duration} ago
    </p>
  );
};

export default JobPostDuration;
