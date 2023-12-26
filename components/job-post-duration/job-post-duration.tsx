import { formatDistanceToNow } from "date-fns";

const JobPostDuration = ({
  createdAt,
  color,
}: {
  createdAt: Date | undefined;
  color: string;
}) => {
  let duration;

  if (createdAt) {
    const time = new Date(createdAt);

    const timePeriod = formatDistanceToNow(time, { addSuffix: true });

    duration = timePeriod?.replace("about", "");
  }

  return (
    <p className={`${color} text-sm lg:text-base tracking-[1%] `}>
      Posted {duration}
    </p>
  );
};

export default JobPostDuration;
