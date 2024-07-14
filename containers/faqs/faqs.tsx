import { SectionHeading, FaqCard } from "@/components";
import FaqSkeletonLoader from "@/utilities/skeletons/faq-skeleton-loader";
import { useGetAllFaqs } from "@/utilities/data-fetching/getAllFaqs";

const Faqs = () => {
  const { faqs, isLoading, isError } = useGetAllFaqs();

  return (
    <section className="container bg-background">
      <SectionHeading
        heading="Frequently Asked Questions"
        subheading="These are answers to commom questions. Please reach out to us via email or our social channels for any inquiry."
      />

      <div className="grid grid-cols-1 lg:gap-10 gap-6 w-full place-items-center max-w-[630px]">
        {isLoading || isError
          ? [...Array(4)].map((_, index) => (
              <FaqSkeletonLoader key={index.toString()} />
            ))
          : faqs?.map((faq) => (
              <FaqCard
                key={faq._id}
                props={faq}
                onClickFaqEditButton={() => {}}
              />
            ))}
      </div>
    </section>
  );
};

export default Faqs;
