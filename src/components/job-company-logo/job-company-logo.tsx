import Image from "next/image";

const JobCompanyLogo = ({ props: job }: { props: JobType | undefined }) => {
  return (
    <article className="w-10 h-10 lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center text-center bg-grey">
      {job?.logo ? (
        <Image
          src={job.logo}
          alt={`${job?.company} logo`}
          height={100}
          width={100}
          loading="lazy"
          quality={100}
          className="w-[21.33px] h-[21.33px] lg:w-[32px] lg:h-[32px] rounded object-contain"
        />
      ) : (
        <p className="font-bold text-2xl md:text-3xl">
          {job?.company.substring(0, 1)}
        </p>
      )}
    </article>
  );
};

export default JobCompanyLogo;
