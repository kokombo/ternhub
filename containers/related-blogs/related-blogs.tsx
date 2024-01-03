import { BlogCard } from "@/components";
import { GroteskBold } from "@/app/font";

type Props = {
  relatedBlogs: BlogType[] | undefined;
  rootUrl: string;
};

const RelatedBlogs = (props: Props) => {
  return (
    <>
      {props.relatedBlogs && (
        <section className="flex_center gap-6 lg:gap-[50px]">
          <h2 className="text-[28px] font-medium " style={GroteskBold.style}>
            Related Blogs
          </h2>

          <div className="blog_list_grid">
            {props.relatedBlogs.map((blog) => (
              <BlogCard key={blog._id} props={blog} rootUrl={props.rootUrl} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedBlogs;
