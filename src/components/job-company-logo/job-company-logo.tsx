const JobCompanyLogo = ({ props }: { props: Job }) => {
  return (
    <article className="w-10 h-10 lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center text-center bg-grey">
      {props.logo ? (
        <img
          src={props.company}
          alt={`${props.company} logo`}
          className="w-[21.33px] h-[21.33px] lg:w-[32px] lg:h-[32px] rounded"
        />
      ) : (
        <p className="font-bold text-2xl md:text-3xl">
          {props.company.substring(0, 1)}
        </p>
      )}
    </article>
  );
};

export default JobCompanyLogo;
