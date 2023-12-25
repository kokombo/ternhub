import { formatDistanceToNow } from "date-fns";

const JobPostDuration = ({ props }: { props: JobType | undefined }) => {
  const timeStamp = props?.createdAt;

  let duration;

  if (timeStamp) {
    const time = new Date(timeStamp);

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
