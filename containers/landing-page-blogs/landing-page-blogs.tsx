import { SectionHeading, BlogCard, StyledLink } from "../../components";
import axios from "axios";
import { useQuery } from "react-query";
import BlogSkeletonLoader from "../../utilities/skeletons/blog-skeleton-loader";

const LandingPageBlogs = () => {
  const fetchBlogsRequest = async (): Promise<BlogType[] | undefined> => {
    const res = await axios.get("/api/blog");
    return res.data;
  };

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery("fetchBlogs", fetchBlogsRequest, {
    refetchOnWindowFocus: false,

    staleTime: 60 * 60 * 60 * 1000,
  });

  return (
    <section className="container">
      <SectionHeading
        heading="Resources"
        subheading="Stay up-to-date and find inspiration in out exciting blog resources."
      />

      <div className="landing_page_blog_container">
        {isLoading || isError
          ? [...Array(4)].map((_, index) => <BlogSkeletonLoader key={index} />)
          : blogs &&
            blogs.length > 1 &&
            blogs
              .slice(0, 4)
              .map((blog) => (
                <BlogCard key={blog._id} props={blog} rootUrl="/blogs" />
              ))}
      </div>

      <StyledLink
        label="View more blogs"
        arialabel="Landing page link to all blogs page"
        url="/blogs"
        extraClasses="self-center blue_button"
      />
    </section>
  );
};

export default LandingPageBlogs;
