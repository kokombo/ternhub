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
    <button
      type="button"
      className="h-10 px-6 py-[8px] lg:px-[32px] lg:py-3 lg:h-12 lg:text-base text-sm bg-purple rounded-[10px] text-white font-semibold hover:bg-blue"
    >
      <Link href={`https://${applyLink}`} target="_href">
        Apply
      </Link>
    </button>
  );
};

export default ApplyToJobButton;
