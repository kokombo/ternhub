import Link from "next/link";

const ApplyToJobButton = ({ props: job }: { props: JobType | undefined }) => {
  let applyLink;

  if (job?.site) {
    if (job.site.includes("https://")) {
      applyLink = job.site.replace("https://", "");
    } else if (job.site.includes("http://")) {
      applyLink = job.site.replace("http://", "");
    } else {
      applyLink = job.site;
    }
  }

  return (
    <Link
      href={`https://${applyLink}`}
      aria-label="Llink to a job's application page."
      target="_href"
      className="apply_button"
    >
      Apply
    </Link>
  );
};

export default ApplyToJobButton;
