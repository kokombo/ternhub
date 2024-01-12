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
    <>
      {job?.site ? (
        <Link
          href={`https://${applyLink}`}
          aria-label="link to a job's application page via url"
          target="_href"
          className="apply_button"
        >
          Apply
        </Link>
      ) : job?.email ? (
        <Link
          href={`mailto:${job?.email}`}
          aria-label="link to apply to a job via email"
          className="apply_button"
          target="_href"
        >
          Apply
        </Link>
      ) : null}
    </>
  );
};

export default ApplyToJobButton;
