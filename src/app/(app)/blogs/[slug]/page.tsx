import { BlogInfoPage } from "@/containers";

const BlogPage = ({ params }: { params: { slug: string } }) => {
  return <BlogInfoPage slug={params.slug} rootUrl="/blogs" />;
};

export default BlogPage;
