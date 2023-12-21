import { SectionHeading, FaqCard } from "@/components";
import { useQuery } from "react-query";
import axios from "axios";
import FaqSkeletonLoader from "@/utilities/skeletons/faq-skeleton-loader";

const Faqs = () => {
  const fetchFaqsRequest = async (): Promise<FaqType[] | undefined> => {
    return await axios.get("/api/faq");
  };

  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery("getAllFaqs", fetchFaqsRequest, {
    refetchOnWindowFocus: false,
  });

  return (
    <section className="container bg-background">
      <SectionHeading
        heading="Frequently Adked Questions"
        subheading="These are answers to commom questions. Please reach out to us via email or our social channels for any inquiry."
      />

      <div className="grid grid-cols-1 gap-10">
        {isLoading || isError
          ? [...Array(4)].map((_, index) => <FaqSkeletonLoader key={index} />)
          : faqs && faqs.map((faq) => <FaqCard key={faq.id} props={faq} />)}
      </div>
    </section>
  );
};

export default Faqs;
